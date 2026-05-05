#!/usr/bin/env node
/**
 * DS Health report generator (v1).
 * Writes packages/ui/src/ds-health-dashboard/health-report.json
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeActionListInsight } from "./deep-insights.mjs";
import { buildComponentTokenParity } from "./component-token-parity.mjs";
import { buildTokenPathApplySites, tokenPathUsageFromApplySites } from "./token-apply-sites.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");
const uiSrc = join(root, "packages", "ui", "src");
const tokensPath = join(uiSrc, "styles", "tokens.css");
const componentsRoot = join(uiSrc, "components");
const snapshotPath = join(root, "data", "figma-variables.snapshot.json");
const variablesJsonPath = join(root, "data", "variables.json");
const outDir = join(uiSrc, "ds-health-dashboard");
const outPath = join(outDir, "health-report.json");

function extractCssVariableNames(css) {
  const names = new Set();
  const re = /(--[a-z0-9-]+)\s*:/gi;
  let m;
  while ((m = re.exec(css))) names.add(m[1]);
  return [...names].sort();
}

function cssVarToTokenPath(varName) {
  return varName.replace(/^--/, "").replace(/-/g, "/");
}

function stripBlockComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function countVarRefs(css) {
  const re = /var\(\s*(--[a-z0-9-]+)/gi;
  let n = 0;
  while (re.exec(css)) n += 1;
  return n;
}

/** PascalCase → kebab for `--component-{kebab}-*` */
function componentNameToCssKebab(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Moléculas / contenedores: no deberían acumular muchos tokens con prefijo propio.
 * Botones, chips, controles pueden tener más tokens de componente con sentido.
 */
const STRUCTURAL_COMPONENTS = new Set([
  "Card",
  "ActionList",
  "ContentModule",
  "CardCarousel",
  "Banner",
  "DoubleRewardCard",
  "Header"
]);

function countComponentScopedVarRefs(css, componentKebab) {
  const re = new RegExp(`var\\(\\s*--component-${componentKebab}-`, "gi");
  return (css.match(re) ?? []).length;
}

const INTERACTIVE_COMPONENTS = new Set(["Button", "IconButton", "SegmentedControl", "Chip"]);

function classifyTokenStrategy(name, literalColorHits, literalPxHits, varRefs, scopedRefs) {
  const structural = STRUCTURAL_COMPONENTS.has(name);
  if (structural && scopedRefs > 8) return "over_engineered";
  if (!structural && scopedRefs > 42) return "over_engineered";
  if (INTERACTIVE_COMPONENTS.has(name) && literalPxHits >= 4) return "incorrect_use";
  if (literalColorHits > 0) return "incorrect_use";
  if (literalPxHits > 10) return "incorrect_use";
  if (varRefs > 0 && literalColorHits + literalPxHits > 6 && literalPxHits > 6) return "missing_token";
  return "correct";
}

function analyzeCssLiterals(css) {
  const stripped = stripBlockComments(css);
  let literalColorHits = 0;
  let literalPxHits = 0;
  let typographyLiteralHits = 0;
  const hexRe = /#[0-9a-fA-F]{3,8}\b/g;
  const rgbaRe = /\brgba?\s*\(/gi;
  for (const line of stripped.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("@import")) continue;
    const withoutVar = line.replace(/var\s*\([^)]*\)/g, "");
    literalColorHits += (withoutVar.match(hexRe) ?? []).length;
    literalColorHits += (withoutVar.match(rgbaRe) ?? []).length;
    const px = withoutVar.match(/\b\d+px\b/g) ?? [];
    literalPxHits += px.filter((x) => x !== "0px").length;
    if (/(font-size|line-height|letter-spacing)\s*:/i.test(line) && /\d+px/.test(withoutVar)) {
      typographyLiteralHits += 1;
    }
  }
  return {
    literalColorHits,
    literalPxHits,
    typographyLiteralHits,
    varRefs: countVarRefs(stripped)
  };
}

function walkCssFiles(dir, acc) {
  if (!existsSync(dir)) return acc;
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walkCssFiles(p, acc);
    else if (ent.isFile() && ent.name.endsWith(".css")) acc.push(p);
  }
  return acc;
}

function listComponentNames() {
  if (!existsSync(componentsRoot)) return [];
  return readdirSync(componentsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function tryGitLastCommitIso(relPathFromRoot) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPathFromRoot}"`, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

function loadJson(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

/** Colección · modo · tipo (solo con export variables.json completo). */
function buildFigmaVariableContext(data) {
  const out = {};
  for (const col of data.collections ?? []) {
    const colName = typeof col?.name === "string" ? col.name : "Colección";
    for (const mode of col?.modes ?? []) {
      const modeName = typeof mode?.name === "string" ? mode.name : "Modo";
      for (const variable of mode?.variables ?? []) {
        const n = variable?.name && String(variable.name).trim();
        if (!n) continue;
        const type = variable?.type ? String(variable.type) : "";
        const label = type ? `${colName} · ${modeName} · ${type}` : `${colName} · ${modeName}`;
        if (!out[n]) out[n] = label;
      }
    }
  }
  return out;
}

/** Figma export JSON (p. ej. `data/variables.json`): collections[].modes[].variables[].name */
function loadFigmaPathsFromVariablesJson(filePath) {
  const data = loadJson(filePath);
  if (!data || !Array.isArray(data.collections)) return null;
  const names = new Set();
  let firstCollectionName = "";
  for (const col of data.collections) {
    if (typeof col?.name === "string" && col.name && !firstCollectionName) {
      firstCollectionName = col.name;
    }
    for (const mode of col?.modes ?? []) {
      for (const variable of mode?.variables ?? []) {
        if (variable?.name && String(variable.name).trim()) {
          names.add(String(variable.name).trim());
        }
      }
    }
  }
  if (names.size === 0) return null;
  return {
    paths: [...names].sort(),
    source: "variables.json",
    libraryLabel: firstCollectionName,
    figmaVariableContext: buildFigmaVariableContext(data)
  };
}

function loadFigmaPathsFromSnapshot(filePath) {
  const snap = loadJson(filePath);
  const paths = Array.isArray(snap?.tokenPaths) ? snap.tokenPaths.map(String).filter(Boolean) : [];
  if (paths.length === 0) return null;
  return { paths: [...paths].sort(), source: "figma-variables.snapshot.json", libraryLabel: null, figmaVariableContext: {} };
}

/** True si existe variable en Figma equivalente a la ruta derivada del CSS. */
function figmaCoversCodePath(figmaSet, codePath) {
  if (figmaSet.has(codePath)) return true;
  if (!codePath.startsWith("semantic/") && figmaSet.has(`semantic/${codePath}`)) return true;
  return false;
}

/** True si tokens.css declara algo equivalente a la ruta de Figma. */
function codeCoversFigmaPath(codeSet, figmaPath) {
  if (codeSet.has(figmaPath)) return true;
  if (figmaPath.startsWith("semantic/")) {
    const stripped = figmaPath.slice("semantic/".length);
    if (codeSet.has(stripped)) return true;
  }
  return false;
}

/** Pares código ↔ Figma que ya cuentan como alineados (misma variable con reglas semantic/). */
function buildAlignedPairs(codeTokenPaths, figmaSet) {
  const pairs = [];
  for (const codePath of codeTokenPaths) {
    if (!figmaCoversCodePath(figmaSet, codePath)) continue;
    const figmaPath = figmaSet.has(codePath) ? codePath : `semantic/${codePath}`;
    pairs.push({ codePath, figmaPath });
  }
  pairs.sort((a, b) => a.codePath.localeCompare(b.codePath));
  return pairs;
}

function loadMetadata(componentName) {
  const p = join(componentsRoot, componentName, `${componentName}.metadata.json`);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

function hasStories(componentName) {
  const dir = join(componentsRoot, componentName);
  if (!existsSync(dir)) return false;
  return readdirSync(dir).some((f) => /\.stories\.(tsx|ts|mdx)$/i.test(f));
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function componentScore(row) {
  let s = 100;
  if (!row.hasMetadata) s -= 25;
  if (!row.hasStories) s -= 18;
  if (!row.hasFigmaInMetadata) s -= 8;
  s -= clamp(row.literalColorHits * 6, 0, 24);
  s -= clamp(Math.floor(row.literalPxHits / 2), 0, 20);
  return clamp(Math.round(s), 0, 100);
}

function main() {
  const tokensCss = readFileSync(tokensPath, "utf8");
  const cssVarNames = extractCssVariableNames(tokensCss);
  const codeTokenPaths = new Set(cssVarNames.map(cssVarToTokenPath));

  const variablesFilePresent = existsSync(variablesJsonPath);
  const snapshotPresent = existsSync(snapshotPath);
  const fromVariables = variablesFilePresent ? loadFigmaPathsFromVariablesJson(variablesJsonPath) : null;
  const fromSnapshot =
    !fromVariables || fromVariables.paths.length === 0 ? loadFigmaPathsFromSnapshot(snapshotPath) : null;
  const picked = fromVariables?.paths?.length ? fromVariables : fromSnapshot?.paths?.length ? fromSnapshot : null;

  const figmaPaths = picked?.paths ?? [];
  const figmaSet = new Set(figmaPaths);
  const figmaVariableContext = picked?.figmaVariableContext ?? {};
  const variableSource = picked?.source ?? "none";
  const libraryLabel = picked?.libraryLabel ?? null;

  const allCss = walkCssFiles(uiSrc, []).filter((p) => !p.endsWith(join("styles", "tokens.css")));

  const globalCssHygiene = {
    files: 0,
    literalColorHits: 0,
    literalPxHits: 0,
    typographyLiteralHits: 0,
    varRefs: 0
  };
  for (const file of allCss) {
    const rel = relative(componentsRoot, file);
    if (!rel.startsWith("..")) continue;
    globalCssHygiene.files += 1;
    const c = readFileSync(file, "utf8");
    const a = analyzeCssLiterals(c);
    globalCssHygiene.literalColorHits += a.literalColorHits;
    globalCssHygiene.literalPxHits += a.literalPxHits;
    globalCssHygiene.typographyLiteralHits += a.typographyLiteralHits;
    globalCssHygiene.varRefs += a.varRefs;
  }

  const componentNames = listComponentNames();
  const component_health = [];

  for (const name of componentNames) {
    const dir = join(componentsRoot, name);
    const cssFiles = walkCssFiles(dir, []);
    const meta = loadMetadata(name);
    let literalColorHits = 0;
    let literalPxHits = 0;
    let typographyLiteralHits = 0;
    let varRefs = 0;
    let mergedCss = "";
    for (const file of cssFiles) {
      const c = readFileSync(file, "utf8");
      mergedCss += c;
      const a = analyzeCssLiterals(c);
      literalColorHits += a.literalColorHits;
      literalPxHits += a.literalPxHits;
      typographyLiteralHits += a.typographyLiteralHits;
      varRefs += a.varRefs;
    }
    const kebab = componentNameToCssKebab(name);
    const componentScopedTokenRefs = countComponentScopedVarRefs(mergedCss, kebab);
    const tokenStrategy = classifyTokenStrategy(
      name,
      literalColorHits,
      literalPxHits,
      varRefs,
      componentScopedTokenRefs
    );
    const hasMetadata = meta != null;
    const hasFigmaInMetadata = Boolean(meta && typeof meta === "object" && "figma" in meta);
    const stories = hasStories(name);
    const relDir = relative(root, dir);
    const lastCommitAt = tryGitLastCommitIso(relDir);

    const row = {
      name,
      path: `packages/ui/src/components/${name}`,
      hasMetadata,
      hasFigmaInMetadata,
      hasStories: stories,
      cssFileCount: cssFiles.length,
      literalColorHits,
      literalPxHits,
      typographyLiteralHits,
      varRefs,
      componentScopedTokenRefs,
      tokenStrategy,
      lastCommitAt
    };
    row.score = componentScore({ ...row, hasStories: stories });
    component_health.push(row);
  }

  const healthByName = new Map(component_health.map((c) => [c.name, c]));

  let figmaDrift;
  if (figmaPaths.length === 0) {
    if (!variablesFilePresent && !snapshotPresent) {
      figmaDrift = {
        status: "no_snapshot_file",
        variableSource: "none",
        message:
          "Añade data/variables.json (export de variables de Figma) o data/figma-variables.snapshot.json para comparar con tokens.css."
      };
    } else {
      figmaDrift = {
        status: "no_snapshot_data",
        variableSource: variablesFilePresent ? "variables.json" : snapshotPresent ? "figma-variables.snapshot.json" : "none",
        message: variablesFilePresent
          ? "data/variables.json existe pero no se encontraron nombres en collections[].modes[].variables[]."
          : "figma-variables.snapshot.json tiene tokenPaths vacío."
      };
    }
  } else {
    const missingInFigma = [...codeTokenPaths].filter((p) => !figmaCoversCodePath(figmaSet, p));
    const extraInFigma = [...figmaSet].filter((p) => !codeCoversFigmaPath(codeTokenPaths, p));
    const alignedPairs = buildAlignedPairs(codeTokenPaths, figmaSet);
    const alignedPairCount = alignedPairs.length;
    const figmaPathsWithCodeMatch = new Set(alignedPairs.map((p) => p.figmaPath)).size;
    const codeTokenPathCount = codeTokenPaths.size;
    const tokenPathApplySites = buildTokenPathApplySites({
      componentsRoot,
      listComponentNames,
      walkCssFiles,
      stripBlockComments,
      readFileSync,
      join,
      cssVarToTokenPath
    });
    const tokenPathUsage = tokenPathUsageFromApplySites(tokenPathApplySites);
    const componentTokenParity = buildComponentTokenParity({
      componentNames: listComponentNames(),
      figmaPaths,
      codeTokenPaths,
      componentsRoot,
      walkCssFiles,
      stripBlockComments,
      readFileSync,
      join,
      cssVarToTokenPath,
      healthByName
    });
    figmaDrift = {
      status: "compared",
      variableSource,
      variableLibraryFile: variableSource === "variables.json" ? "data/variables.json" : "data/figma-variables.snapshot.json",
      libraryLabel,
      figmaVariableCount: figmaPaths.length,
      codeTokenPathCount,
      alignedPairCount,
      figmaPathsWithCodeMatch,
      missingInFigmaCount: missingInFigma.length,
      extraInFigmaCount: extraInFigma.length,
      /** En código (`tokens.css`) pero sin variable equivalente en el export de Figma */
      missingInFigmaPaths: missingInFigma,
      /** En el export de Figma pero sin variable equivalente declarada en `tokens.css` */
      extraInFigmaPaths: extraInFigma,
      /** Pares ya alineados (para contexto en el dashboard; no son desajuste) */
      alignedPairs,
      /** Ruta de token → nombres de componente que referencian esa variable en su CSS */
      tokenPathUsage,
      /** Ruta de token → sitios (componente + pieza BEM + propiedad CSS) */
      tokenPathApplySites,
      /** Nombre de variable Figma → etiqueta colección/modo/tipo */
      figmaVariableContext,
      /** Paridad por componente (prefijos component/ en código vs Figma) */
      componentTokenParity
    };
  }

  const aggregateSignals = component_health.reduce(
    (acc, r) => ({
      totalLiteralColors: acc.totalLiteralColors + r.literalColorHits,
      totalLiteralPx: acc.totalLiteralPx + r.literalPxHits,
      totalTypographyLiterals: acc.totalTypographyLiterals + r.typographyLiteralHits,
      totalVarBindings: acc.totalVarBindings + r.varRefs
    }),
    {
      totalLiteralColors: globalCssHygiene.literalColorHits,
      totalLiteralPx: globalCssHygiene.literalPxHits,
      totalTypographyLiterals: globalCssHygiene.typographyLiteralHits,
      totalVarBindings: globalCssHygiene.varRefs
    }
  );

  const avgComponentScore =
    component_health.length === 0
      ? null
      : Math.round(
          component_health.reduce((acc, r) => acc + r.score, 0) / component_health.length
        );

  const tokensLayerScore = clamp(
    100 - Math.min(15, figmaDrift.missingInFigmaCount ?? 0) - Math.min(10, figmaDrift.extraInFigmaCount ?? 0),
    0,
    100
  );

  const insights = {
    ActionList: analyzeActionListInsight({ componentsRoot })
  };

  const report = {
    reportVersion: 1,
    generatedAt: new Date().toISOString(),
    phase: "pre-adoption",
    roadmap: {
      specs:
        "Pendiente: integrar Specs (directededges) para 1–2 componentes piloto cuando el set Figma esté estable."
    },
    layers: {
      systemAlignment: {
        score:
          figmaDrift.status === "compared"
            ? clamp(95 - ((figmaDrift.missingInFigmaCount ?? 0) > 0 ? 12 : 0), 0, 100)
            : 72,
        summary: "Alineación entre variables de diseño (export en data/) y tokens en código.",
        checks: [
          { id: "figma-variable-library", ok: figmaPaths.length > 0 },
          { id: "metadata-figma-block", ok: component_health.every((c) => c.hasFigmaInMetadata) }
        ]
      },
      tokens: {
        score: tokensLayerScore,
        summary: `tokens.css define ${cssVarNames.length} variables CSS.`,
        checks: [
          { id: "tokens-file-present", ok: existsSync(tokensPath) },
          { id: "figma-token-path-parity", ok: figmaDrift.status === "compared" && figmaDrift.missingInFigmaCount === 0 }
        ]
      },
      components: {
        score: avgComponentScore ?? 0,
        summary: "Higiene CSS por carpeta, metadata, stories y vínculo Figma en metadata.",
        checks: [
          { id: "all-metadata", ok: component_health.every((c) => c.hasMetadata) },
          { id: "all-stories", ok: component_health.every((c) => c.hasStories) },
          { id: "css-literals-low", ok: component_health.every((c) => c.literalColorHits === 0) }
        ]
      },
      business: {
        score: clamp((avgComponentScore ?? 70) - (component_health.filter((c) => !c.hasStories).length > 0 ? 8 : 0), 0, 100),
        summary: "Proxies v1: cobertura de stories, puntuación por componente, actividad git reciente.",
        metrics: {
          components: componentNames.length,
          withStories: component_health.filter((c) => c.hasStories).length,
          withoutStories: component_health.filter((c) => !c.hasStories).map((c) => c.name),
          avgComponentScore
        }
      }
    },
    tokens: {
      source: relative(root, tokensPath).replaceAll("\\", "/"),
      variableCount: cssVarNames.length,
      variableNamesSample: cssVarNames.slice(0, 40)
    },
    cssHygiene: {
      outsideComponents: globalCssHygiene
    },
    aggregateSignals,
    figmaDrift,
    insights,
    component_health
  };

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`DS health report written to ${relative(root, outPath)}`);
}

main();
