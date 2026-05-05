import {
  compareGroupKey,
  driftPathMeta,
  subgroupTitleFor,
  type DriftPathMeta
} from "./token-path-buckets";

const SECTION_ORDER: DriftPathMeta["sectionId"][] = ["figma-library", "generic", "component"];

const ORDER_GENERIC = ["semantic", "typography", "color", "spacing", "layout", "legacy", "other"];
const ORDER_COMP = ["typo", "color", "space", "focus", "other"];
const ORDER_FIGMA = ["musky-typo", "musky-other", "shadow"];

const SECTION_COPY: Record<
  DriftPathMeta["sectionId"],
  { title: string; hint: string }
> = {
  "figma-library": {
    title: "Biblioteca en Figma",
    hint: "Misma categoría en dos columnas: filas atenuadas = ya enlazadas código ↔ Figma; filas normales = solo en un lado."
  },
  generic: {
    title: "Genéricos",
    hint: "Cada fila compara la misma categoría en paralelo: variable CSS (`--…`), dónde se usa en código (componentes), variable Figma y su contexto en el archivo (colección · modo · tipo)."
  },
  component: {
    title: "Por componente",
    hint: "Tokens bajo `component/…` agrupados por pieza. Uso = referencias `var(--…)` en CSS de esa carpeta de componente."
  }
};

export type DriftCompareRow = {
  kind: "aligned" | "code_only" | "figma_only";
  codePath: string | null;
  figmaPath: string | null;
};

export type DriftCompareSubgroup = { id: string; title: string; rows: DriftCompareRow[] };
export type DriftCompareBlock = { id: string; title?: string; subgroups: DriftCompareSubgroup[] };
export type DriftCompareSection = { id: string; title: string; hint?: string; blocks: DriftCompareBlock[] };

function sortSubgroupIds(sectionId: DriftPathMeta["sectionId"], ids: string[]): string[] {
  const order =
    sectionId === "figma-library" ? ORDER_FIGMA : sectionId === "generic" ? ORDER_GENERIC : ORDER_COMP;
  return [...ids].sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

function sortRows(rows: DriftCompareRow[]) {
  rows.sort((a, b) => {
    const pa = a.kind === "aligned" ? 1 : 0;
    const pb = b.kind === "aligned" ? 1 : 0;
    if (pa !== pb) return pa - pb;
    const sa = a.codePath ?? a.figmaPath ?? "";
    const sb = b.codePath ?? b.figmaPath ?? "";
    return sa.localeCompare(sb);
  });
}

/**
 * Secciones con tablas código | Figma | uso, agrupadas igual que las listas por columna.
 * Prioriza filas de desajuste; las alineadas quedan al final del subgrupo (estilo atenuado en UI).
 */
export function buildDriftCompareSections(input: {
  missingInFigmaPaths: string[];
  extraInFigmaPaths: string[];
  alignedPairs: Array<{ codePath: string; figmaPath: string }>;
}): DriftCompareSection[] {
  const bucketRows = new Map<string, DriftCompareRow[]>();
  const bucketMeta = new Map<string, DriftPathMeta>();

  function add(meta: DriftPathMeta, row: DriftCompareRow) {
    const key = compareGroupKey(meta);
    if (!bucketRows.has(key)) bucketRows.set(key, []);
    bucketRows.get(key)!.push(row);
    if (!bucketMeta.has(key)) bucketMeta.set(key, meta);
  }

  for (const { codePath, figmaPath } of input.alignedPairs) {
    add(driftPathMeta(codePath, "missing"), { kind: "aligned", codePath, figmaPath });
  }
  for (const codePath of input.missingInFigmaPaths) {
    add(driftPathMeta(codePath, "missing"), { kind: "code_only", codePath, figmaPath: null });
  }
  for (const figmaPath of input.extraInFigmaPaths) {
    add(driftPathMeta(figmaPath, "extra"), { kind: "figma_only", codePath: null, figmaPath });
  }

  for (const rows of bucketRows.values()) sortRows(rows);

  const tree = new Map<string, Map<string, Map<string, DriftCompareRow[]>>>();
  for (const [key, rows] of bucketRows) {
    const meta = bucketMeta.get(key)!;
    if (!tree.has(meta.sectionId)) tree.set(meta.sectionId, new Map());
    const sec = tree.get(meta.sectionId)!;
    if (!sec.has(meta.blockId)) sec.set(meta.blockId, new Map());
    sec.get(meta.blockId)!.set(meta.subgroupId, rows);
  }

  const out: DriftCompareSection[] = [];
  for (const sectionId of SECTION_ORDER) {
    const secMap = tree.get(sectionId);
    if (!secMap || secMap.size === 0) continue;

    const copy = SECTION_COPY[sectionId];
    const blocks: DriftCompareBlock[] = [];

    const blockIds = [...secMap.keys()].sort((a, b) => a.localeCompare(b));

    for (const blockId of blockIds) {
      const subMap = secMap.get(blockId)!;
      const subgroupIds = sortSubgroupIds(sectionId, [...subMap.keys()]);
      const subgroups: DriftCompareSubgroup[] = [];
      for (const subgroupId of subgroupIds) {
        const rows = subMap.get(subgroupId)!;
        const sm: DriftPathMeta = { sectionId, blockId, subgroupId };
        subgroups.push({
          id: subgroupId,
          title: subgroupTitleFor(sm),
          rows
        });
      }
      blocks.push({
        id: blockId,
        title: blockId === "__single__" ? undefined : blockId,
        subgroups
      });
    }

    out.push({
      id: sectionId,
      title: copy.title,
      hint: copy.hint,
      blocks
    });
  }

  return out;
}
