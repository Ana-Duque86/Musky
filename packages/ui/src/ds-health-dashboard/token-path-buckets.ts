/**
 * Agrupa rutas de tokens del informe DS Health para lectura humana
 * (genéricos, biblioteca Figma, por componente → tipografía / color / espaciado…).
 */

const COMPONENT_PREFIXES: Array<[string, string]> = [
  ["component/double/reward/card", "DoubleRewardCard"],
  ["component/icon/button", "IconButton"],
  ["component/segmented/control", "SegmentedControl"],
  ["component/card/carousel", "CardCarousel"],
  ["component/content/module", "ContentModule"],
  ["component/actionList", "ActionList"],
  ["component/doubleRewardCard", "DoubleRewardCard"]
];

const TYPO_RE = /(^|\/)(font|line|letter|typography|caption|label|body|display|h[1-3]|text\/|weight)/i;
const COLOR_RE = /(color|\/bg|background|border|surface|\/danger|\/success|\/warning|\/info|\/icon|fill|progress|\/on\/)/i;
const SPACING_RE = /(padding|margin|gap|height|width|inset|radius|offset|space|size|min\/|max\/)/i;
const FOCUS_RE = /(focus|ring)/i;

export type DriftSubgroup = {
  id: string;
  title: string;
  paths: string[];
};

export type DriftBlock = {
  id: string;
  /** Ausente cuando un solo bloque agrupa todo el tramo (p. ej. genéricos en una columna). */
  title?: string;
  hint?: string;
  subgroups: DriftSubgroup[];
};

export type DriftSection = {
  id: string;
  title: string;
  hint?: string;
  blocks: DriftBlock[];
};

function sortPaths(paths: string[]): string[] {
  return [...paths].sort((a, b) => a.localeCompare(b));
}

function toTitleCaseSegment(seg: string): string {
  if (!seg) return seg;
  if (/^[a-z]+([A-Z][a-z]*)+$/.test(seg)) {
    return seg.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim();
  }
  return seg
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function matchComponentBlock(path: string): { rest: string; displayName: string } | null {
  if (!path.startsWith("component/")) return null;
  for (const [prefix, name] of COMPONENT_PREFIXES) {
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      return { rest: path.length > prefix.length ? path.slice(prefix.length + 1) : "", displayName: name };
    }
  }
  const m = path.match(/^component\/([^/]+)(?:\/(.*))?$/);
  if (!m) return null;
  const seg = m[1];
  const rest = m[2] ?? "";
  return { rest, displayName: toTitleCaseSegment(seg) };
}

function subgroupForComponentRest(rest: string): { id: string; title: string } {
  if (!rest) return { id: "other", title: "Raíz del componente" };
  if (TYPO_RE.test(rest)) return { id: "typo", title: "Tipografía y texto" };
  if (FOCUS_RE.test(rest)) return { id: "focus", title: "Foco y anillos" };
  if (COLOR_RE.test(rest)) return { id: "color", title: "Color, fondos y bordes" };
  if (SPACING_RE.test(rest)) return { id: "space", title: "Espaciado y medidas" };
  return { id: "other", title: "Otros" };
}

function isFigmaLibraryPath(path: string): boolean {
  return path.startsWith("Musky/") || /^Shadow\b/i.test(path);
}

function classifyGeneric(path: string): { id: string; title: string } {
  if (path.startsWith("semantic/")) return { id: "semantic", title: "Semántica (superficies, texto, iconos…)" };
  if (path.startsWith("typography/")) return { id: "typography", title: "Escala tipográfica (tokens en código)" };
  if (path.startsWith("color/")) return { id: "color", title: "Color primitivo" };
  if (path.startsWith("space/") || path.startsWith("spacing/")) return { id: "spacing", title: "Espaciado" };
  if (path.startsWith("layout/") || path.startsWith("radius/") || path.startsWith("border/")) {
    return { id: "layout", title: "Layout y radio" };
  }
  if (path.startsWith("borderWidth/") || path.startsWith("fontWeight/")) return { id: "layout", title: "Layout y radio" };
  if (path.startsWith("background/") || path.startsWith("text/")) {
    return { id: "legacy", title: "Alias legacy (superficies / texto)" };
  }
  return { id: "other", title: "Otros genéricos" };
}

function subgroupForFigmaLibrary(path: string): { id: string; title: string } {
  if (path.startsWith("Musky/Typography") || path.includes("Typography")) {
    return { id: "musky-typo", title: "Estilos de texto con nombre de biblioteca" };
  }
  if (path.startsWith("Musky/")) return { id: "musky-other", title: "Otros estilos Musky/" };
  return { id: "shadow", title: "Sombras y efectos" };
}

/** Metadatos de agrupación para una ruta en una columna del diff (misma lógica que las listas por columna). */
export type DriftPathMeta = {
  sectionId: "figma-library" | "generic" | "component";
  blockId: string;
  subgroupId: string;
};

export function driftPathMeta(path: string, column: "missing" | "extra"): DriftPathMeta {
  if (column === "extra" && isFigmaLibraryPath(path)) {
    return { sectionId: "figma-library", blockId: "__single__", subgroupId: subgroupForFigmaLibrary(path).id };
  }
  const comp = matchComponentBlock(path);
  if (comp) {
    return {
      sectionId: "component",
      blockId: comp.displayName,
      subgroupId: subgroupForComponentRest(comp.rest).id
    };
  }
  return { sectionId: "generic", blockId: "__single__", subgroupId: classifyGeneric(path).id };
}

export function compareGroupKey(meta: DriftPathMeta): string {
  return `${meta.sectionId}\0${meta.blockId}\0${meta.subgroupId}`;
}

function pushPath(
  map: Map<string, Map<string, string[]>>,
  blockId: string,
  subgroupId: string,
  path: string
) {
  if (!map.has(blockId)) map.set(blockId, new Map());
  const sub = map.get(blockId)!;
  if (!sub.has(subgroupId)) sub.set(subgroupId, []);
  sub.get(subgroupId)!.push(path);
}

const ORDER_GENERIC = ["semantic", "typography", "color", "spacing", "layout", "legacy", "other"];
const ORDER_COMP = ["typo", "color", "space", "focus", "other"];
const ORDER_FIGMA = ["musky-typo", "musky-other", "shadow"];

const GENERIC_SUBGROUP_TITLES: Record<string, string> = {
  semantic: "Semántica (superficies, texto, iconos…)",
  typography: "Escala tipográfica (tokens en código)",
  color: "Color primitivo",
  spacing: "Espaciado",
  layout: "Layout y radio",
  legacy: "Alias legacy (superficies / texto)",
  other: "Otros genéricos"
};

const FIGMA_SUBGROUP_TITLES: Record<string, string> = {
  "musky-typo": "Estilos de texto con nombre de biblioteca",
  "musky-other": "Otros estilos Musky/",
  shadow: "Sombras y efectos"
};

export function subgroupTitleFor(meta: DriftPathMeta): string {
  if (meta.sectionId === "figma-library") {
    return FIGMA_SUBGROUP_TITLES[meta.subgroupId] ?? meta.subgroupId;
  }
  if (meta.sectionId === "component") {
    return (
      {
        typo: "Tipografía y texto",
        color: "Color, fondos y bordes",
        space: "Espaciado y medidas",
        focus: "Foco y anillos",
        other: "Otros"
      }[meta.subgroupId] ?? meta.subgroupId
    );
  }
  return GENERIC_SUBGROUP_TITLES[meta.subgroupId] ?? GENERIC_SUBGROUP_TITLES.other;
}

function finalizeBlocks(
  blockMap: Map<string, Map<string, string[]>>,
  subgroupTitle: (blockId: string, subId: string) => string,
  order: string[]
): DriftBlock[] {
  const blocks: DriftBlock[] = [];
  for (const [blockId, subMap] of blockMap) {
    const subgroups: DriftSubgroup[] = [];
    for (const [subId, ps] of subMap) {
      if (ps.length === 0) continue;
      subgroups.push({
        id: subId,
        title: subgroupTitle(blockId, subId),
        paths: sortPaths(ps)
      });
    }
    subgroups.sort((a, b) => {
      const ia = order.indexOf(a.id);
      const ib = order.indexOf(b.id);
      if (ia === -1 && ib === -1) return a.title.localeCompare(b.title);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
    if (subgroups.length) {
      blocks.push({
        id: blockId,
        title: blockId === "__single__" ? undefined : blockId,
        subgroups
      });
    }
  }
  return blocks;
}

/**
 * Construye secciones para una columna del diff (código ↔ Figma).
 */
export function buildDriftSections(paths: string[], column: "missing" | "extra"): DriftSection[] {
  const figmaLib = new Map<string, Map<string, string[]>>();
  const generic = new Map<string, Map<string, string[]>>();
  const components = new Map<string, Map<string, string[]>>();

  const genericSubgroupTitle = (_blockId: string, subId: string) =>
    GENERIC_SUBGROUP_TITLES[subId] ?? GENERIC_SUBGROUP_TITLES.other;

  const figmaSubgroupTitle = (_blockId: string, subId: string) => {
    if (subId === "musky-typo") return "Estilos de texto con nombre de biblioteca";
    if (subId === "musky-other") return "Otros estilos Musky/";
    return "Sombras y efectos";
  };

  const compSubgroupTitle = (_blockId: string, subId: string) =>
    ({
      typo: "Tipografía y texto",
      color: "Color, fondos y bordes",
      space: "Espaciado y medidas",
      focus: "Foco y anillos",
      other: "Otros"
    }[subId] ?? subId);

  for (const path of paths) {
    if (column === "extra" && isFigmaLibraryPath(path)) {
      const sg = subgroupForFigmaLibrary(path);
      pushPath(figmaLib, "__single__", sg.id, path);
      continue;
    }

    const comp = matchComponentBlock(path);
    if (comp) {
      const sg = subgroupForComponentRest(comp.rest);
      const blockId = comp.displayName;
      if (!components.has(blockId)) components.set(blockId, new Map());
      const bm = components.get(blockId)!;
      if (!bm.has(sg.id)) bm.set(sg.id, []);
      bm.get(sg.id)!.push(path);
      continue;
    }

    const g = classifyGeneric(path);
    pushPath(generic, "__single__", g.id, path);
  }

  const sections: DriftSection[] = [];

  if (column === "extra" && figmaLib.size > 0) {
    const blocks = finalizeBlocks(figmaLib, figmaSubgroupTitle, ORDER_FIGMA);
    if (blocks.length) {
      sections.push({
        id: "figma-library",
        title: "Biblioteca en Figma",
        hint: "Nombres tal como están en el archivo de diseño; no siempre coinciden con el kebab de `tokens.css`.",
        blocks
      });
    }
  }

  if (generic.size > 0) {
    const blocks = finalizeBlocks(generic, genericSubgroupTitle, ORDER_GENERIC);
    if (blocks.length) {
      sections.push({
        id: "generic",
        title: "Genéricos",
        hint: "Tokens globales del sistema (no ligados a un solo componente en la ruta).",
        blocks
      });
    }
  }

  if (components.size > 0) {
    const names = [...components.keys()].sort((a, b) => a.localeCompare(b));
    const blocks: DriftBlock[] = [];
    for (const name of names) {
      const subMap = components.get(name)!;
      const blockMap = new Map([[name, subMap]]);
      const inner = finalizeBlocks(blockMap, compSubgroupTitle, ORDER_COMP);
      if (inner.length) blocks.push(inner[0]);
    }
    if (blocks.length) {
      sections.push({
        id: "components",
        title: "Por componente",
        hint: "Rutas bajo `component/…` agrupadas por pieza y por tipo (tipografía, color, espaciado…).",
        blocks
      });
    }
  }

  return sections;
}
