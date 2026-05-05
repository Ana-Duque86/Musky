import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import "./health-dashboard.css";
import report from "./health-report.json";
import type { DriftCompareRow } from "./token-drift-compare";
import { tokenPathToCssVar } from "./token-path-format";
import {
  type ComponentHealthRow,
  formatGeneratedAt,
  mainIssueForRow,
  priorities,
  readinessFromAvg,
  tokenLevelLabelEs,
  tokenNarrative,
  tokenPercentages,
  tokenStrategyLabelEs,
  tokenStrategyToLevel,
  topProblems,
  weeklyActions
} from "./health-derive";

export type HealthView = "overview" | "tokens" | "components";

export interface HealthDashboardProps {
  /** Initial tab; updates when the prop changes (Storybook controls). */
  initialView?: HealthView;
}

type LayerKey = "systemAlignment" | "tokens" | "components" | "business";

type LayerBlock = {
  score: number;
  summary: string;
  checks?: { id: string; ok: boolean }[];
  metrics?: Record<string, unknown>;
};

type TokenApplySite = {
  component: string;
  label: string;
  property: string;
};

type ComponentTokenParity = {
  componentName: string;
  codePrefix: string | null;
  figmaPrefix: string | null;
  figmaTokenCount: number;
  codeTokenCount: number;
  matchedCount: number;
  missingInFigmaCount: number;
  extraInFigmaCount: number;
  tokenHealthScore: number;
  rows: DriftCompareRow[];
  cssVarReferencesCount?: number;
  globalTokenRefsSample?: string[];
  usesHardcodedLiterals?: boolean;
  literalColorHits?: number;
  literalPxHits?: number;
  typographyLiteralHits?: number;
  implementationNote?: string | null;
};

type FigmaDrift =
  | { status: "no_snapshot_file" | "no_snapshot_data"; message?: string; variableSource?: string }
  | {
      status: "compared";
      missingInFigmaCount: number;
      extraInFigmaCount: number;
      missingInFigmaPaths?: string[];
      extraInFigmaPaths?: string[];
      /** Pares ya enlazados código ↔ Figma (contexto; no cuentan como desajuste) */
      alignedPairs?: Array<{ codePath: string; figmaPath: string }>;
      /** Ruta de token → componentes que usan esa variable en su CSS */
      tokenPathUsage?: Record<string, string[]>;
      /** Ruta de token → sitios (componente + pieza BEM + propiedad CSS) */
      tokenPathApplySites?: Record<string, TokenApplySite[]>;
      /** Nombre de variable Figma → contexto (colección · modo · tipo) */
      figmaVariableContext?: Record<string, string>;
      /** Paridad tokens bajo prefijos component/ por pieza React */
      componentTokenParity?: ComponentTokenParity[];
      variableSource?: string;
      libraryLabel?: string | null;
      figmaVariableCount?: number;
      /** Rutas lógicas declaradas en tokens.css */
      codeTokenPathCount?: number;
      /** Pares código ↔ Figma alineados (misma variable, reglas semantic/ incluidas) */
      alignedPairCount?: number;
      /** Variables Figma distintas que participan en al menos un par alineado */
      figmaPathsWithCodeMatch?: number;
      variableLibraryFile?: string;
    };

type HealthReport = typeof report & {
  layers: Record<LayerKey, LayerBlock>;
  figmaDrift: FigmaDrift;
  aggregateSignals?: {
    totalLiteralColors: number;
    totalLiteralPx: number;
    totalTypographyLiterals: number;
    totalVarBindings: number;
  };
};

const data = report as HealthReport;

const dimensionLabels: Record<LayerKey, string> = {
  systemAlignment: "Comparación de variables (opcional)",
  tokens: "Tokens",
  components: "Componentes",
  business: "Documentación y adopción"
};

function pillFigma(ok: boolean) {
  return ok ? "musky-health__pill musky-health__pill--ok" : "musky-health__pill musky-health__pill--bad";
}

function pillDoc(ok: boolean) {
  return ok ? "musky-health__pill musky-health__pill--ok" : "musky-health__pill musky-health__pill--bad";
}

function pillTokenLevel(level: "alto" | "medio" | "bajo") {
  if (level === "alto") return "musky-health__pill musky-health__pill--ok";
  if (level === "medio") return "musky-health__pill musky-health__pill--warn";
  return "musky-health__pill musky-health__pill--bad";
}

function HealthBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  let trackClass = "musky-health__bar-track musky-health__bar-track--ok";
  if (v < 72) trackClass = "musky-health__bar-track musky-health__bar-track--bad";
  else if (v < 86) trackClass = "musky-health__bar-track musky-health__bar-track--mid";
  return (
    <div className={trackClass} role="img" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
      <div className="musky-health__bar-fill" style={{ width: `${v}%` }} />
    </div>
  );
}

export function HealthDashboard({ initialView = "overview" }: HealthDashboardProps) {
  const [view, setView] = useState<HealthView>(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  const rows = data.component_health as ComponentHealthRow[];
  const agg = useMemo(
    () =>
      data.aggregateSignals ?? {
        totalLiteralColors: 0,
        totalLiteralPx: 0,
        totalTypographyLiterals: 0,
        totalVarBindings: 1
      },
    []
  );

  const avgScore = (data.layers.business.metrics as { avgComponentScore?: number } | undefined)?.avgComponentScore ?? null;
  const readiness = useMemo(() => readinessFromAvg(avgScore), [avgScore]);

  return (
    <div className="musky-health">
      <header className="musky-health__header musky-health__header--toolbar">
        <div>
          <h1 className="musky-health__title">DS Health · Ready-to-scale (pre-adopción)</h1>
          <p className="musky-health__meta">
            Fase: pre-adopción · Informe v{data.reportVersion} · {formatGeneratedAt(data.generatedAt)}
          </p>
        </div>
      </header>

      <div className="musky-health__tabs" role="tablist" aria-label="Secciones del informe">
        <Button
          type="button"
          variant={view === "overview" ? "primary" : "secondary"}
          size="md"
          onClick={() => setView("overview")}
        >
          Resumen
        </Button>
        <Button
          type="button"
          variant={view === "tokens" ? "primary" : "secondary"}
          size="md"
          onClick={() => setView("tokens")}
        >
          Tokens
        </Button>
        <Button
          type="button"
          variant={view === "components" ? "primary" : "secondary"}
          size="md"
          onClick={() => setView("components")}
        >
          Componentes
        </Button>
      </div>

      {view === "overview" ? (
        <Overview readiness={readiness} avgScore={avgScore} rows={rows} agg={agg} />
      ) : null}
      {view === "tokens" ? <TokensView figmaDrift={data.figmaDrift} /> : null}
      {view === "components" ? <ComponentsView rows={rows} /> : null}

      <div className="musky-health__roadmap">
        <strong>Próxima etapa del sistema</strong>
        Cuando el kit en diseño esté estable, conectaremos especificaciones enlazadas a Figma para cerrar el ciclo
        diseño → código con menos fricción.
      </div>
    </div>
  );
}

function Overview({
  readiness,
  avgScore,
  rows,
  agg
}: {
  readiness: ReturnType<typeof readinessFromAvg>;
  avgScore: number | null;
  rows: ComponentHealthRow[];
  agg: NonNullable<HealthReport["aggregateSignals"]>;
}) {
  const missingFigma = rows.filter((r) => !r.hasFigmaInMetadata).length;
  const missingStories = rows.filter((r) => !r.hasStories).length;
  const problems = useMemo(
    () => topProblems(rows, missingFigma, missingStories),
    [rows, missingFigma, missingStories]
  );
  const prio = useMemo(() => priorities(rows), [rows]);
  const week = useMemo(() => weeklyActions(rows), [rows]);
  const score = avgScore ?? 0;
  const layerKeys: LayerKey[] = ["systemAlignment", "tokens", "components", "business"];

  return (
    <>
      <div className="musky-health__hero-row">
        <article className={`musky-health__card musky-health__card--readiness musky-health__card--${readiness.key}`}>
          <h2 className="musky-health__h2">¿Listo para escalar?</h2>
          <p className="musky-health__readiness-label">{readiness.label}</p>
          <p className="musky-health__hint">{readiness.hint}</p>
        </article>
        <article className="musky-health__card musky-health__card--score">
          <h2 className="musky-health__h2">Salud global</h2>
          <p className="musky-health__big-score">
            {avgScore != null ? `${avgScore}` : "—"}
            <span className="musky-health__big-score-suffix">/100</span>
          </p>
          <HealthBar value={score} />
          <p className="musky-health__hint musky-health__hint--tight">
            Promedio de componentes: diseño enlazado, documentación y uso de tokens.
          </p>
        </article>
      </div>

      <section className="musky-health__section">
        <h2 className="musky-health__h2 musky-health__h2--inline">Señales por dimensión</h2>
        <div className="musky-health__dimensions">
          {layerKeys.map((key) => (
            <article key={key} className="musky-health__dim-card">
              <p className="musky-health__dim-label">{dimensionLabels[key]}</p>
              <p className="musky-health__dim-score">{data.layers[key].score}</p>
              <HealthBar value={data.layers[key].score} />
            </article>
          ))}
        </div>
      </section>

      <div className="musky-health__triple">
        <section className="musky-health__card musky-health__card--stretch">
          <h2 className="musky-health__h2">Problemas principales</h2>
          <p className="musky-health__section-lead">¿Qué está frenando decisiones claras?</p>
          <ul className="musky-health__bullet-list">
            {problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
        <section className="musky-health__card musky-health__card--stretch">
          <h2 className="musky-health__h2">Prioridades</h2>
          <p className="musky-health__section-lead">Orden sugerido para las próximas iteraciones</p>
          <ol className="musky-health__numbered-list">
            {prio.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </section>
        <section className="musky-health__card musky-health__card--stretch musky-health__card--week">
          <h2 className="musky-health__h2">Qué hacer esta semana</h2>
          <p className="musky-health__section-lead">Tres pasos concretos según el estado actual</p>
          <ul className="musky-health__checklist">
            {week.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="musky-health__card musky-health__card--tokens-preview">
        <h2 className="musky-health__h2">Tokens en una mirada</h2>
        <p className="musky-health__section-lead">Porcentajes orientativos de adherencia (colores, espaciado, tipografía)</p>
        <TokenBars agg={agg} />
        <p className="musky-health__narrative">{tokenNarrative(tokenPercentages(agg))}</p>
      </section>
    </>
  );
}

function TokenBars({ agg }: { agg: NonNullable<HealthReport["aggregateSignals"]> }) {
  const p = tokenPercentages(agg);
  return (
    <div className="musky-health__token-bars">
      <div>
        <div className="musky-health__token-bar-head">
          <span>Colores</span>
          <strong>{p.color}%</strong>
        </div>
        <HealthBar value={p.color} />
      </div>
      <div>
        <div className="musky-health__token-bar-head">
          <span>Espaciado</span>
          <strong>{p.spacing}%</strong>
        </div>
        <HealthBar value={p.spacing} />
      </div>
      <div>
        <div className="musky-health__token-bar-head">
          <span>Tipografía</span>
          <strong>{p.typography}%</strong>
        </div>
        <HealthBar value={p.typography} />
      </div>
    </div>
  );
}

const TOKEN_DRIFT_CHIP_HELP: Record<
  "totalFigma" | "linkedFigma" | "totalCode" | "linked",
  { title: string; aria: string }
> = {
  totalFigma: {
    title:
      "Lo sacamos del listado de nombres del export de Figma que usa el informe (por ejemplo data/variables.json). Es el total de variables que vienen en ese archivo.",
    aria: "Ayuda: de dónde sale el total de tokens en Figma"
  },
  linkedFigma: {
    title:
      "Cuenta cuántas variables distintas de Figma tienen el mismo nombre que una variable en tokens.css. Si el nombre coincide, las consideramos enlazadas.",
    aria: "Ayuda: de dónde salen los tokens enlazados en Figma"
  },
  totalCode: {
    title:
      "Lo sacamos del fichero tokens.css del proyecto: todas las variables CSS que están declaradas ahí (cada nombre distinto cuenta una vez).",
    aria: "Ayuda: de dónde sale el total de tokens en código"
  },
  linked: {
    title:
      "Cuenta las variables de tokens.css que también aparecen en el export de Figma con el mismo nombre. Cada pareja cuenta como un enlace.",
    aria: "Ayuda: de dónde salen los tokens enlazados"
  }
};

function TokenStatChipHelp({ chipKey }: { chipKey: keyof typeof TOKEN_DRIFT_CHIP_HELP }) {
  const { title, aria } = TOKEN_DRIFT_CHIP_HELP[chipKey];
  return (
    <button type="button" className="musky-health__token-stat-chip__help" title={title} aria-label={aria}>
      ?
    </button>
  );
}

function TokenDriftStatChips({ drift }: { drift: Extract<FigmaDrift, { status: "compared" }> }) {
  const totalFigma = drift.figmaVariableCount ?? 0;
  const linkedFigma = drift.figmaPathsWithCodeMatch ?? 0;
  const totalCode = drift.codeTokenPathCount ?? 0;
  const linked = drift.alignedPairCount ?? (drift.alignedPairs?.length ?? 0);
  return (
    <div className="musky-health__token-stat-chips" role="group" aria-label="Resumen de tokens Figma y código">
      <span className="musky-health__token-stat-chip">
        <span className="musky-health__token-stat-chip__label-row">
          <span className="musky-health__token-stat-chip__label">Total tokens en Figma</span>
          <TokenStatChipHelp chipKey="totalFigma" />
        </span>
        <strong className="musky-health__token-stat-chip__value">{totalFigma}</strong>
      </span>
      <span className="musky-health__token-stat-chip">
        <span className="musky-health__token-stat-chip__label-row">
          <span className="musky-health__token-stat-chip__label">Tokens enlazados en Figma</span>
          <TokenStatChipHelp chipKey="linkedFigma" />
        </span>
        <strong className="musky-health__token-stat-chip__value">{linkedFigma}</strong>
      </span>
      <span className="musky-health__token-stat-chip">
        <span className="musky-health__token-stat-chip__label-row">
          <span className="musky-health__token-stat-chip__label">Tokens en código</span>
          <TokenStatChipHelp chipKey="totalCode" />
        </span>
        <strong className="musky-health__token-stat-chip__value">{totalCode}</strong>
      </span>
      <span className="musky-health__token-stat-chip">
        <span className="musky-health__token-stat-chip__label-row">
          <span className="musky-health__token-stat-chip__label">Tokens enlazados</span>
          <TokenStatChipHelp chipKey="linked" />
        </span>
        <strong className="musky-health__token-stat-chip__value">{linked}</strong>
      </span>
    </div>
  );
}

function TokensView({ figmaDrift }: { figmaDrift: FigmaDrift }) {
  return (
    <div className="musky-health__tokens-page">
      <section className="musky-health__card">
        {figmaDrift.status === "compared" ? (
          <>
            <TokenDriftStatChips drift={figmaDrift} />
            <ComponentTokenParityPanels
              applySites={figmaDrift.tokenPathApplySites ?? {}}
              figmaVariableContext={figmaDrift.figmaVariableContext ?? {}}
              parity={figmaDrift.componentTokenParity ?? []}
              tokenPathUsage={figmaDrift.tokenPathUsage ?? {}}
            />
          </>
        ) : (
          <p className="musky-health__hint musky-health__hint--compare">
            {"message" in figmaDrift && typeof figmaDrift.message === "string"
              ? figmaDrift.message
              : "Sin datos de export de Figma para comparar."}
          </p>
        )}
      </section>
    </div>
  );
}

function figmaContextRich(figmaPath: string | null, figmaVariableContext: Record<string, string>) {
  if (!figmaPath) return <span className="musky-health__compare-empty">—</span>;
  const ctx = figmaVariableContext[figmaPath];
  const part = figmaVariablePartLabel(figmaPath);
  if (!ctx && !part) {
    return (
      <span className="musky-health__hint musky-health__hint--inline">
        (sin export detallado: snapshot u otro origen)
      </span>
    );
  }
  return (
    <span className="musky-health__figma-context-stack">
      {ctx ? <span>{ctx}</span> : null}
      {ctx && part ? <span> · </span> : null}
      {part ? <span className="musky-health__ctx-part">{part}</span> : null}
    </span>
  );
}

function camelCaseToSpaces(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/-/g, " ");
}

/** Parte de UI inferida desde el nombre de variable Figma (p. ej. progress · height). */
function figmaVariablePartLabel(figmaPath: string): string {
  const parts = figmaPath.split("/");
  if (parts[0] === "component" && parts.length >= 4) {
    return parts.slice(2).map(camelCaseToSpaces).join(" · ");
  }
  if (parts[0] === "Musky" && parts.length >= 2) {
    return parts.slice(1).map(camelCaseToSpaces).join(" · ");
  }
  if (parts[0] === "semantic" && parts.length >= 2) {
    return parts.slice(1).map(camelCaseToSpaces).join(" · ");
  }
  return "";
}

function applySitesCell(
  codePath: string | null,
  sites: Record<string, TokenApplySite[]>,
  tokenPathUsage: Record<string, string[]>,
  opts?: { onlyComponent?: string }
) {
  if (!codePath) return <span className="musky-health__compare-empty">—</span>;
  let list = sites[codePath] ?? [];
  if (opts?.onlyComponent) {
    list = list.filter((s) => s.component === opts.onlyComponent);
  }
  if (list.length === 0) {
    const comps = tokenPathUsage[codePath];
    if (comps?.length) {
      return <span>{comps.join(", ")}</span>;
    }
    return (
      <span className="musky-health__hint musky-health__hint--inline">(sin var() en CSS de componentes indexado)</span>
    );
  }
  return (
    <ul className="musky-health__apply-site-list">
      {list.map((s, i) => (
        <li key={`${s.component}-${s.label}-${s.property}-${i}`}>
          <strong>{s.component}</strong> · <span>{s.label}</span>{" "}
          <code className="musky-health__code musky-health__code--inline">{s.property}</code>
        </li>
      ))}
    </ul>
  );
}

function ComponentParityStatChips({
  figmaTokenCount,
  codeTokenCount,
  matchedCount,
  mismatchedCount
}: {
  figmaTokenCount: number;
  codeTokenCount: number;
  matchedCount: number;
  mismatchedCount: number;
}) {
  return (
    <div
      className="musky-health__parity-component-stat-chips"
      role="group"
      aria-label="Resumen de tokens por componente"
    >
      <span className="musky-health__parity-stat-chip">
        <span className="musky-health__parity-stat-chip__label">Tokens en Figma</span>
        <strong className="musky-health__parity-stat-chip__value">{figmaTokenCount}</strong>
      </span>
      <span className="musky-health__parity-stat-chip">
        <span className="musky-health__parity-stat-chip__label">Tokens en código</span>
        <strong className="musky-health__parity-stat-chip__value">{codeTokenCount}</strong>
      </span>
      <span className="musky-health__parity-stat-chip musky-health__parity-stat-chip--ok">
        <span className="musky-health__parity-stat-chip__label">Tokens que coinciden</span>
        <strong className="musky-health__parity-stat-chip__value">{matchedCount}</strong>
      </span>
      <span className="musky-health__parity-stat-chip musky-health__parity-stat-chip--bad">
        <span className="musky-health__parity-stat-chip__label">Tokens que no</span>
        <strong className="musky-health__parity-stat-chip__value">{mismatchedCount}</strong>
      </span>
    </div>
  );
}

function ComponentTokenParityPanels({
  parity,
  figmaVariableContext,
  applySites,
  tokenPathUsage
}: {
  parity: ComponentTokenParity[];
  figmaVariableContext: Record<string, string>;
  applySites: Record<string, TokenApplySite[]>;
  tokenPathUsage: Record<string, string[]>;
}) {
  if (parity.length === 0) return null;

  return (
    <section className="musky-health__compare-section musky-health__compare-section--parity">
      <h3 className="musky-health__compare-section-title">Paridad por componente</h3>
      <div className="musky-health__parity-stack">
        {parity.map((c) => {
          const driftTotal = c.missingInFigmaCount + c.extraInFigmaCount;
          return (
            <div key={c.componentName} className="musky-health__parity-card">
              <div className="musky-health__parity-card-head">
                <h4 className="musky-health__parity-card-title">{c.componentName}</h4>
                <ComponentParityStatChips
                  figmaTokenCount={c.figmaTokenCount}
                  codeTokenCount={c.codeTokenCount}
                  matchedCount={c.matchedCount}
                  mismatchedCount={driftTotal}
                />
                <div className="musky-health__parity-score-row">
                  <span className="musky-health__parity-score-label">Salud tokens {c.tokenHealthScore}%</span>
                  <div className="musky-health__parity-score-bar">
                    <HealthBar value={c.tokenHealthScore} />
                  </div>
                </div>
              </div>
              {(c.codePrefix || c.figmaPrefix) && (
                <p className="musky-health__hint musky-health__parity-prefixes">
                  {c.codePrefix ? (
                    <>
                      Código: <code className="musky-health__code">{c.codePrefix}</code>
                    </>
                  ) : (
                    <>Código: (sin prefijo mapeado)</>
                  )}
                  {" · "}
                  {c.figmaPrefix ? (
                    <>
                      Figma: <code className="musky-health__code">{c.figmaPrefix}</code>
                    </>
                  ) : (
                    <>Figma: (sin prefijo mapeado)</>
                  )}
                </p>
              )}
              {c.implementationNote ? <p className="musky-health__parity-note">{c.implementationNote}</p> : null}
              <div className="musky-health__parity-meta">
                {c.usesHardcodedLiterals ? (
                  <span className="musky-health__parity-chip musky-health__parity-chip--bad">
                    Literales: color {c.literalColorHits ?? 0}, px {c.literalPxHits ?? 0}, tipografía{" "}
                    {c.typographyLiteralHits ?? 0}
                  </span>
                ) : (
                  <span className="musky-health__parity-chip musky-health__parity-chip--ok">Sin literales (proxy)</span>
                )}
              </div>
              <div className="musky-health__compare-table-wrap">
                <table className="musky-health__compare-table musky-health__compare-table--wide">
                  <thead>
                    <tr>
                      <th scope="col">Ruta (código)</th>
                      <th scope="col">Variable CSS</th>
                      <th scope="col">Elemento (código)</th>
                      <th scope="col">Variable Figma</th>
                      <th scope="col">Contexto Figma</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.rows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="musky-health__compare-empty-row">
                          Sin tokens bajo estos prefijos (o componente sin CSS de tokens propios).
                        </td>
                      </tr>
                    ) : (
                      c.rows.map((row, ri) => (
                        <tr
                          key={`${c.componentName}-${row.kind}-${ri}-${row.codePath ?? ""}-${row.figmaPath ?? ""}`}
                          className={
                            row.kind === "aligned"
                              ? "musky-health__compare-row musky-health__compare-row--aligned"
                              : "musky-health__compare-row musky-health__compare-row--drift"
                          }
                        >
                          <td>
                            {row.codePath ? (
                              <code className="musky-health__code musky-health__code--table">{row.codePath}</code>
                            ) : (
                              <span className="musky-health__compare-empty">—</span>
                            )}
                          </td>
                          <td>
                            {row.codePath ? (
                              <code className="musky-health__code musky-health__code--table">
                                {tokenPathToCssVar(row.codePath)}
                              </code>
                            ) : (
                              <span className="musky-health__compare-empty">—</span>
                            )}
                          </td>
                          <td className="musky-health__compare-usage">
                            {applySitesCell(row.codePath, applySites, tokenPathUsage, {
                              onlyComponent: c.componentName
                            })}
                          </td>
                          <td>
                            {row.figmaPath ? (
                              <code className="musky-health__code musky-health__code--table">{row.figmaPath}</code>
                            ) : (
                              <span className="musky-health__compare-empty">—</span>
                            )}
                          </td>
                          <td className="musky-health__compare-figma-ctx">
                            {figmaContextRich(row.figmaPath, figmaVariableContext)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ComponentsView({ rows }: { rows: ComponentHealthRow[] }) {
  const sorted = [...rows].sort((a, b) => a.score - b.score);
  return (
    <div className="musky-health__components-page">
      <p className="musky-health__section-lead">
        Vista por componente: salud, enlace con Figma, nivel de tokens, documentación y el primer problema a abordar.
      </p>
      <div className="musky-health__table-wrap">
        <table>
          <thead>
            <tr>
              <th>Componente</th>
              <th>Salud</th>
              <th>Diseño en Figma</th>
              <th>Tokens</th>
              <th>Documentación</th>
              <th>Estrategia de tokens</th>
              <th>Problema principal</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => {
              const level = tokenStrategyToLevel(r.tokenStrategy);
              return (
                <tr key={r.name}>
                  <td>
                    <strong>{r.name}</strong>
                  </td>
                  <td>
                    <div className="musky-health__cell-score">
                      <span>{r.score}%</span>
                      <HealthBar value={r.score} />
                    </div>
                  </td>
                  <td>
                    <span className={pillFigma(r.hasFigmaInMetadata)}>{r.hasFigmaInMetadata ? "OK" : "Falta"}</span>
                  </td>
                  <td>
                    <span className={pillTokenLevel(level)}>{tokenLevelLabelEs(level)}</span>
                  </td>
                  <td>
                    <span className={pillDoc(r.hasStories)}>{r.hasStories ? "OK" : "Falta"}</span>
                  </td>
                  <td>{tokenStrategyLabelEs(r.tokenStrategy)}</td>
                  <td className="musky-health__issue-cell">{mainIssueForRow(r)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
