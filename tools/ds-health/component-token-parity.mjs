/**
 * Paridad tokens componente: prefijos código (ruta lógica tokens.css) ↔ prefijos export Figma.
 */
/** Sin fila de paridad `component/…`: el CSS usa solo tokens globales (p. ej. Card). */
const COMPONENT_TOKEN_PARITY_EXCLUDE = new Set(["Card"]);

export const COMPONENT_TOKEN_PARITY = [
  ["IconButton", "component/icon/button", "component/iconButton"],
  ["SegmentedControl", "component/segmented/control", "component/segmentedControl"],
  ["Button", "component/button", "component/button"],
  ["Chip", "component/chip", "component/chip"],
  ["Banner", "component/banner", "component/banner"],
  ["Avatar", "component/avatar", "component/avatar"],
  ["DoubleRewardCard", "component/double/reward/card", "component/doubleRewardCard"],
  ["ActionList", "component/actionList", "component/actionList"],
  ["CardCarousel", null, "component/carousel"]
];

function stripPrefix(path, prefix) {
  if (!prefix) return null;
  if (path === prefix) return "";
  if (path.startsWith(`${prefix}/`)) return path.slice(prefix.length + 1);
  return null;
}

/**
 * @param {{
 *   componentNames: string[];
 *   figmaPaths: string[];
 *   codeTokenPaths: Set<string>;
 *   componentsRoot: string;
 *   walkCssFiles: (dir: string, acc: string[]) => string[];
 *   stripBlockComments: (css: string) => string;
 *   readFileSync: typeof import("node:fs").readFileSync;
 *   join: typeof import("node:path").join;
 *   cssVarToTokenPath: (varName: string) => string;
 *   healthByName: Map<string, { literalColorHits: number; literalPxHits: number; typographyLiteralHits: number }>;
 * }} opts
 */
export function buildComponentTokenParity(opts) {
  const {
    componentNames,
    figmaPaths,
    codeTokenPaths,
    componentsRoot,
    walkCssFiles,
    stripBlockComments,
    readFileSync,
    join,
    cssVarToTokenPath,
    healthByName
  } = opts;
  const parityByName = new Map(COMPONENT_TOKEN_PARITY.map(([n, c, f]) => [n, { codePrefix: c, figmaPrefix: f }]));

  const out = [];

  for (const name of componentNames) {
    if (COMPONENT_TOKEN_PARITY_EXCLUDE.has(name)) continue;

    const rule = parityByName.get(name);
    const codePrefix = rule?.codePrefix ?? null;
    const figmaPrefix = rule?.figmaPrefix ?? null;

    const figmaPathsFor = figmaPrefix
      ? figmaPaths.filter((p) => p === figmaPrefix || p.startsWith(`${figmaPrefix}/`))
      : [];

    const codePathsDeclared = new Set();
    if (codePrefix) {
      for (const p of codeTokenPaths) {
        if (p === codePrefix || p.startsWith(`${codePrefix}/`)) codePathsDeclared.add(p);
      }
    }

    const codePathsFromCss = new Set();
    const allVarPathsInCss = new Set();
    const dir = join(componentsRoot, name);
    for (const file of walkCssFiles(dir, [])) {
      const css = stripBlockComments(readFileSync(file, "utf8"));
      const re = /var\(\s*(--[a-z0-9-]+)/gi;
      let m;
      while ((m = re.exec(css))) {
        const path = cssVarToTokenPath(m[1]);
        allVarPathsInCss.add(path);
        if (codePrefix && (path === codePrefix || path.startsWith(`${codePrefix}/`))) codePathsFromCss.add(path);
      }
    }

    const codePathsUnion = new Set([...codePathsDeclared, ...codePathsFromCss]);

    const globalRefsUsed = [...allVarPathsInCss].filter(
      (p) => !codePrefix || !(p === codePrefix || p.startsWith(`${codePrefix}/`))
    );

    const health = healthByName?.get(name);
    const usesHardcodedLiterals =
      (health?.literalColorHits ?? 0) + (health?.literalPxHits ?? 0) + (health?.typographyLiteralHits ?? 0) > 0;
    const implementationNote =
      figmaPathsFor.length > 0 && codePathsFromCss.size === 0
        ? `El CSS de ${name} no referencia variables \`component/.../\` bajo el prefijo mapeado: usa tokens globales (semantic/, typography/, space/, etc.). Las variables de Figma con prefijo de pieza aparecen sin par hasta cablearlas en el CSS.`
        : null;

    const suffixToFigma = new Map();
    for (const fp of figmaPathsFor) {
      const suf = stripPrefix(fp, figmaPrefix);
      if (suf !== null) suffixToFigma.set(suf, fp);
    }

    const suffixToCode = new Map();
    if (codePrefix) {
      for (const cp of codePathsUnion) {
        const suf = stripPrefix(cp, codePrefix);
        if (suf !== null) suffixToCode.set(suf, cp);
      }
    }

    const allSuffixes = new Set([...suffixToFigma.keys(), ...suffixToCode.keys()]);
    const sortedSuffixes = [...allSuffixes].sort((a, b) => a.localeCompare(b));

    const rows = [];
    let matched = 0;
    let codeOnly = 0;
    let figmaOnly = 0;
    for (const suf of sortedSuffixes) {
      const codePath = suffixToCode.get(suf) ?? null;
      const figmaPath = suffixToFigma.get(suf) ?? null;
      if (codePath && figmaPath) {
        rows.push({ kind: "aligned", codePath, figmaPath });
        matched += 1;
      } else if (codePath) {
        rows.push({ kind: "code_only", codePath, figmaPath: null });
        codeOnly += 1;
      } else {
        rows.push({ kind: "figma_only", codePath: null, figmaPath });
        figmaOnly += 1;
      }
    }

    rows.sort((a, b) => {
      const pa = a.kind === "aligned" ? 1 : 0;
      const pb = b.kind === "aligned" ? 1 : 0;
      if (pa !== pb) return pa - pb;
      const sa = a.codePath ?? a.figmaPath ?? "";
      const sb = b.codePath ?? b.figmaPath ?? "";
      return sa.localeCompare(sb);
    });

    const nFigma = figmaPathsFor.length;
    const nCode = codePathsUnion.size;
    const denom = Math.max(nFigma, nCode, 1);
    const tokenHealthScore = Math.round(Math.min(100, (100 * matched) / denom));

    out.push({
      componentName: name,
      codePrefix,
      figmaPrefix,
      figmaTokenCount: nFigma,
      codeTokenCount: nCode,
      matchedCount: matched,
      missingInFigmaCount: codeOnly,
      extraInFigmaCount: figmaOnly,
      tokenHealthScore,
      rows,
      cssVarReferencesCount: allVarPathsInCss.size,
      globalTokenRefsSample: [...globalRefsUsed].sort().slice(0, 36),
      usesHardcodedLiterals,
      literalColorHits: health?.literalColorHits ?? 0,
      literalPxHits: health?.literalPxHits ?? 0,
      typographyLiteralHits: health?.typographyLiteralHits ?? 0,
      implementationNote
    });
  }

  return out;
}
