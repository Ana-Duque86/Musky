/** Tipos mínimos para interpretar el JSON del reporte (campos nuevos opcionales). */

export type TokenStrategy = "correct" | "incorrect_use" | "missing_token" | "over_engineered";

export type ComponentHealthRow = {
  name: string;
  score: number;
  hasFigmaInMetadata: boolean;
  hasStories: boolean;
  tokenStrategy?: TokenStrategy;
};

export type AggregateSignals = {
  totalLiteralColors: number;
  totalLiteralPx: number;
  totalTypographyLiterals: number;
  totalVarBindings: number;
};

export type Readiness = "si" | "casi" | "no";

export function formatGeneratedAt(iso: string): string {
  try {
    return new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function readinessFromAvg(avg: number | null): { key: Readiness; label: string; hint: string } {
  if (avg == null) {
    return {
      key: "casi",
      label: "Casi",
      hint: "Genera de nuevo el informe para obtener la salud media del conjunto de componentes."
    };
  }
  if (avg >= 86) {
    return {
      key: "si",
      label: "Sí",
      hint: "La base es sólida. Prioriza solo los pocos puntos que sigan en rojo o ámbar."
    };
  }
  if (avg >= 72) {
    return {
      key: "casi",
      label: "Casi",
      hint: "El sistema tiene buena base. Enfócate en los pocos bloques que arrastran riesgo o deuda."
    };
  }
  return {
    key: "no",
    label: "No",
    hint: "Hay varios frentes abiertos. Conviene ordenar diseño, tokens y documentación antes de escalar."
  };
}

export function tokenPercentages(s: AggregateSignals): { color: number; spacing: number; typography: number } {
  const v = Math.max(1, s.totalVarBindings);
  const color = clampPct(100 - (s.totalLiteralColors / v) * 220);
  const spacing = clampPct(100 - (s.totalLiteralPx / v) * 45);
  const typography = clampPct(100 - (s.totalTypographyLiterals / v) * 180);
  return { color, spacing, typography };
}

function clampPct(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function tokenNarrative(p: { color: number; spacing: number; typography: number }): string {
  const parts: string[] = [];
  if (p.color >= 82) parts.push("Los colores se apoyan bien en el sistema de tokens.");
  else if (p.color >= 65) parts.push("Los colores están razonablemente alineados, con margen de mejora.");
  else parts.push("Los colores aún dependen demasiado de valores fijos fuera de tokens.");

  if (p.spacing >= 78) parts.push("El espaciado usa tokens de forma mayoritaria.");
  else if (p.spacing >= 60) parts.push("El espaciado mezcla tokens y valores fijos; conviene unificar.");
  else parts.push("El espaciado aún fija muchos valores en píxeles en lugar de tokens.");

  if (p.typography >= 78) parts.push("La tipografía está mayormente enlazada a tokens.");
  else if (p.typography >= 62) parts.push("La tipografía puede alinearse mejor con tokens de escala.");
  else parts.push("La tipografía aún tiene demasiados tamaños o interlineados fijos.");

  return parts.join(" ");
}

export function topProblems(rows: ComponentHealthRow[], missingFigma: number, missingStories: number): string[] {
  const problems: string[] = [];
  if (missingFigma > 0) {
    problems.push(
      missingFigma === 1
        ? "Un componente no tiene diseño enlazado en Figma."
        : `${missingFigma} componentes no tienen diseño enlazado en Figma.`
    );
  }
  const lowTokenUse = rows.filter((r) => tokenStrategyToLevel(r.tokenStrategy) === "bajo").length;
  if (lowTokenUse > 0) {
    problems.push(
      lowTokenUse === 1
        ? "Hay componentes con baja adherencia a tokens (colores o espaciado fijos)."
        : `Varios componentes (${lowTokenUse}) arrastran baja adherencia a tokens.`
    );
  }
  if (missingStories > 0) {
    problems.push(
      missingStories === 1
        ? "Falta documentación en Storybook para al menos un componente."
        : `Falta documentación en Storybook en ${missingStories} componentes.`
    );
  }
  const over = rows.filter((r) => r.tokenStrategy === "over_engineered").length;
  if (over > 0 && problems.length < 3) {
    problems.push(
      over === 1
        ? "Un bloque estructural concentra demasiados tokens propios: conviene simplificar."
        : `${over} bloques estructurales podrían simplificar tokens propios.`
    );
  }
  if (problems.length === 0) {
    problems.push("No hay problemas graves detectados en esta pasada.");
    problems.push("Mantén el ritmo de revisión en diseño y documentación.");
  }
  return problems.slice(0, 3);
}

export function priorities(rows: ComponentHealthRow[]): string[] {
  const sorted = [...rows].sort((a, b) => a.score - b.score);
  const out: string[] = [];
  for (const r of sorted.slice(0, 3)) {
    const bits: string[] = [];
    if (!r.hasFigmaInMetadata) bits.push("enlazar Figma");
    if (!r.hasStories) bits.push("documentar en Storybook");
    if (r.tokenStrategy === "incorrect_use" || r.tokenStrategy === "missing_token") bits.push("tokens y espaciado");
    if (r.tokenStrategy === "over_engineered") bits.push("simplificar tokens propios");
    if (bits.length === 0) bits.push("pulir detalles de salud");
    out.push(`Mejorar ${r.name}: ${bits.join(", ")}.`);
  }
  while (out.length < 3) {
    out.push("Revisar la lista de componentes y cerrar los que sigan en ámbar.");
  }
  return out.slice(0, 3);
}

export function weeklyActions(rows: ComponentHealthRow[]): string[] {
  const actions: string[] = [];
  const noFigma = rows.filter((r) => !r.hasFigmaInMetadata);
  if (noFigma.length) {
    const names = noFigma.map((r) => r.name).join(", ");
    actions.push(`Definir o enlazar en Figma: ${names}.`);
  }
  const noStories = rows.filter((r) => !r.hasStories);
  if (noStories.length) {
    actions.push(`Añadir guías en Storybook para: ${noStories.map((r) => r.name).join(", ")}.`);
  }
  const worst = [...rows].sort((a, b) => a.score - b.score)[0];
  if (worst) {
    actions.push(`Priorizar una pasada de diseño + tokens en ${worst.name} (salud más baja).`);
  }
  const unique = [...new Set(actions)];
  while (unique.length < 3) {
    unique.push("Reservar una sesión corta para revisar la tabla de componentes y cerrar ámbares.");
  }
  return unique.slice(0, 3);
}

export function tokenStrategyToLevel(s: TokenStrategy | undefined): "alto" | "medio" | "bajo" {
  if (!s || s === "correct") return "alto";
  if (s === "over_engineered") return "medio";
  return "bajo";
}

export function tokenStrategyLabelEs(s: TokenStrategy | undefined): string {
  switch (s) {
    case "incorrect_use":
      return "Uso incorrecto";
    case "missing_token":
      return "Falta token";
    case "over_engineered":
      return "Sobre-ingeniería";
    case "correct":
    default:
      return "Correcto";
  }
}

export function tokenLevelLabelEs(level: "alto" | "medio" | "bajo"): string {
  if (level === "alto") return "Alto";
  if (level === "medio") return "Medio";
  return "Bajo";
}

export function mainIssueForRow(r: ComponentHealthRow): string {
  if (!r.hasFigmaInMetadata) return "Sin diseño enlazado en Figma.";
  if (!r.hasStories) return "Sin guía en Storybook.";
  switch (r.tokenStrategy) {
    case "over_engineered":
      return "Demasiados tokens propios para un bloque estructural.";
    case "incorrect_use":
      return "Colores o espaciados fijados sin tokens del sistema.";
    case "missing_token":
      return "Convendría sustituir valores fijos por tokens del sistema.";
    default:
      return "Nada urgente.";
  }
}

export function designCodeAlignmentMessage(
  drift: {
    status: string;
    message?: string;
    missingInFigmaCount?: number;
    extraInFigmaCount?: number;
    variableSource?: string;
    figmaVariableCount?: number;
    libraryLabel?: string | null;
  },
  figmaLinkedCount: number,
  totalComponents: number
): string {
  const baseline = `Este panel ya lee la documentación del repositorio (fichas JSON junto a cada componente). ${figmaLinkedCount} de ${totalComponents} componentes enlazan archivo o página de Figma para que diseño y producto abran el marco correcto sin pasos técnicos extra.`;

  if (drift.status === "compared") {
    const m = drift.missingInFigmaCount ?? 0;
    const e = drift.extraInFigmaCount ?? 0;
    const lib =
      drift.variableSource === "variables.json"
        ? `La exportación \`data/variables.json\`${drift.libraryLabel ? ` («${drift.libraryLabel}»)` : ""} aporta ${drift.figmaVariableCount ?? "varias"} variables de Figma`
        : "La lista en \`data/figma-variables.snapshot.json\`";
    if (m === 0 && e === 0) {
      return `${baseline} ${lib} y las rutas alinean con \`tokens.css\`.`;
    }
    return `${baseline} ${lib}; hay ${m + e} desajustes de rutas frente a \`tokens.css\` — conviene revisarlo con diseño.`;
  }
  if (drift.status === "no_snapshot_data") {
    return `${baseline} Hay un archivo de variables en \`data/\` pero no se pudieron leer rutas (revisa el formato del export) o usa \`figma-variables.snapshot.json\` como respaldo con \`tokenPaths\`.`;
  }
  return `${baseline} Coloca la exportación de Figma en \`data/variables.json\` (recomendado) o \`data/figma-variables.snapshot.json\` para comparar rutas con \`tokens.css\`.`;
}

/** @deprecated Usar designCodeAlignmentMessage */
export function figmaAlignmentSummary(
  drift: { status: string; message?: string; missingInFigmaCount?: number; extraInFigmaCount?: number }
): string {
  return designCodeAlignmentMessage(drift, 0, 0);
}
