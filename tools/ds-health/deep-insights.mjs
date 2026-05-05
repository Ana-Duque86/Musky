/**
 * Análisis profundo piloto: ActionList (metadata + TSX + CSS en repo).
 * No requiere API de Figma; detecta señales para revisión manual con diseño.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function read(joined) {
  if (!existsSync(joined)) return "";
  return readFileSync(joined, "utf8");
}

function uniq(a) {
  return [...new Set(a)];
}

/**
 * @param {{ componentsRoot: string }} opts
 */
export function analyzeActionListInsight({ componentsRoot }) {
  const dir = join(componentsRoot, "ActionList");
  const metaPath = join(dir, "ActionList.metadata.json");
  const tsxPath = join(dir, "ActionList.tsx");
  const cssPath = join(dir, "ActionList.css");

  const metaRaw = read(metaPath);
  const tsx = read(tsxPath);
  const css = read(cssPath);

  if (!metaRaw) {
    return { available: false, reason: "No se encontró ActionList.metadata.json" };
  }

  /** @type {Record<string, unknown>} */
  let meta = {};
  try {
    meta = JSON.parse(metaRaw);
  } catch {
    return { available: false, reason: "Metadata de ActionList no es JSON válido" };
  }

  const figma = meta.figma && typeof meta.figma === "object" ? meta.figma : null;
  const tokensArr = Array.isArray(meta.tokens) ? meta.tokens.map(String) : [];
  const zones = Array.isArray(meta.layout?.zones) ? meta.layout.zones.map(String) : [];

  const metadataTypoRefs = tokensArr.filter(
    (t) =>
      /typography|musky|font|caption|label|body|display/i.test(t) && !/^semantic\//i.test(t)
  );
  const figmaStyleNames = tokensArr.filter((t) => /^Musky\//i.test(t));

  const cssTypoVars = uniq((css.match(/var\(\s*(--typography-[a-z0-9-]+)/gi) ?? []).map((m) =>
    m.replace(/var\(\s*/i, "").replace(/\s*$/, "")
  ));

  const rawPxInCss = (css.match(/\b\d+px\b/g) ?? []).filter((x) => x !== "0px").length;

  const structureChecks = [];

  structureChecks.push({
    id: "grouped-card",
    label: "Modo agrupado: tarjeta con borde, radio y sin padding interno (como tarjeta Figma)",
    ok:
      css.includes("musky-action-list--grouped") &&
      css.includes("border-radius: var(--radius-md)") &&
      css.includes("padding: 0")
  });

  structureChecks.push({
    id: "row-inset",
    label: "Filas usan el inset denso del sistema (layout/container/insetDense)",
    ok: /\.musky-action-list__row[\s\S]*?var\(--layout-container-inset-dense\)/i.test(css)
  });

  structureChecks.push({
    id: "zones-leading-content-chevron",
    label: "Estructura en zonas: icono a la izquierda, columna de contenido, chevron a la derecha si aplica",
    ok:
      /musky-action-list__leading/.test(tsx) &&
      /musky-action-list__content/.test(tsx) &&
      /musky-action-list__chevron-slot/.test(tsx)
  });

  structureChecks.push({
    id: "chip-with-title-no-progress",
    label: "Chip de prioridad junto al título cuando no hay barra de reembolso",
    ok: /!hasProgress\s*\?\s*<Chip/.test(tsx) || /!hasProgress[\s\S]*?<Chip/.test(tsx)
  });

  structureChecks.push({
    id: "chevron-only-actionable",
    label: "Chevron solo en filas accionables",
    ok: /isActionable\s*\?[\s\S]*musky-action-list__chevron/.test(tsx)
  });

  structureChecks.push({
    id: "dividers-between-items",
    label: "Separadores entre ítems (no después del último)",
    ok: /!isLast\s*\?\s*["']musky-action-list__item--divided["']/.test(tsx) || /item--divided/.test(tsx)
  });

  structureChecks.push({
    id: "progress-four-steps",
    label: "Progreso de reembolso en cuatro segmentos",
    ok: /repeat\(4,\s*minmax\(0,\s*1fr\)\)/.test(css) && /progressSteps/.test(tsx)
  });

  const titleUsesBodyTokens =
    /\.musky-action-list__title[\s\S]*?font-size:\s*var\(--typography-body-font-size\)/i.test(css);
  const metadataMentionsLabelSm = tokensArr.some((t) => /label.*small|label\/sm/i.test(t));

  const typographyNotes = [];
  if (figmaStyleNames.length) {
    typographyNotes.push(
      `La ficha lista nombres de estilo de Figma (${figmaStyleNames.slice(0, 3).join(", ")}${figmaStyleNames.length > 3 ? "…" : ""}). Si en el archivo de diseño esos estilos cambiaron de tamaño, aquí puede haber desfase aunque el código use tokens CSS.`
    );
  }
  if (metadataMentionsLabelSm && titleUsesBodyTokens) {
    typographyNotes.push(
      "El título en código usa escala «body» con peso semibold; en la ficha también aparecen referencias a tipografía «label/small». Revisa en Figma cuál aplica al título de la fila."
    );
  }

  const warnings = [];
  if (rawPxInCss >= 6) {
    warnings.push(
      "Hay varios valores en píxeles fijos en la hoja de estilos (p. ej. márgenes del chip). Conviene contrastarlos con el último frame en Figma."
    );
  }
  if (zones.length && !zones.every((z) => /leading|content|trailing|chevron|column/i.test(z))) {
    warnings.push(
      `Las zonas declaradas en la ficha (${zones.join(", ")}) no encajan con el patrón esperado; contrasta con el frame en Figma.`
    );
  }

  const failedStructure = structureChecks.filter((c) => !c.ok);

  return {
    available: true,
    component: "ActionList",
    figmaDoc: figma
      ? {
          linked: true,
          url: typeof figma.file === "string" ? figma.file : null,
          page: typeof figma.page === "string" ? figma.page : null,
          referenceNode: typeof figma.referenceNode === "string" ? figma.referenceNode : null,
          componentSet: typeof figma.componentSet === "string" ? figma.componentSet : null
        }
      : { linked: false },
    layoutZonesDeclared: zones,
    structureChecks,
    structureSummary:
      failedStructure.length === 0
        ? "La estructura del código coincide con las reglas principales descritas en la ficha del componente."
        : `${failedStructure.length} comprobación(es) de estructura no coinciden con lo documentado; revisa Figma y la ficha.`,
    typography: {
      metadataRefsSample: metadataTypoRefs.slice(0, 12),
      cssVariablesSample: cssTypoVars.slice(0, 12),
      figmaStyleNames,
      notes: typographyNotes
    },
    hygiene: {
      rawPxTokensheetCount: rawPxInCss
    },
    warnings: warnings.concat(
      failedStructure.length
        ? [`Revisar: ${failedStructure.map((f) => f.label).join(" · ")}`]
        : []
    )
  };
}
