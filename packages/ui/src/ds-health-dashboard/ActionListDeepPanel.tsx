import { Button } from "../components/Button";
import "./health-dashboard.css";
import report from "./health-report.json";

type InsightCheck = { id: string; label: string; ok: boolean };

type ActionListInsight = {
  available: boolean;
  reason?: string;
  component?: string;
  figmaDoc?: {
    linked: boolean;
    url?: string | null;
    page?: string | null;
    referenceNode?: string | null;
    componentSet?: string | null;
  };
  layoutZonesDeclared?: string[];
  structureChecks?: InsightCheck[];
  structureSummary?: string;
  typography?: {
    metadataRefsSample: string[];
    cssVariablesSample: string[];
    figmaStyleNames: string[];
    notes: string[];
  };
  hygiene?: { rawPxTokensheetCount: number };
  warnings?: string[];
};

const insights = (report as { insights?: { ActionList?: ActionListInsight } }).insights;

export function ActionListDeepPanel() {
  const data = insights?.ActionList;

  if (!data || !data.available) {
    return (
      <div className="musky-health musky-health--narrow">
        <p className="musky-health__narrative">
          {data?.reason ?? "No hay análisis profundo de ActionList. Ejecuta `npm run ds:health` en la raíz del monorepo."}
        </p>
      </div>
    );
  }

  const fd = data.figmaDoc;

  return (
    <div className="musky-health musky-health--detail">
      <header className="musky-health__header">
        <h1 className="musky-health__title">Action List · revisión profunda</h1>
        <p className="musky-health__meta">
          Comparación automática entre la ficha del componente, el TSX y el CSS del repo. No sustituye abrir Figma,
          pero concentra qué contrastar primero.
        </p>
      </header>

      {fd?.linked && fd.url ? (
        <section className="musky-health__card musky-health__card--stretch">
          <h2 className="musky-health__h2">Diseño en Figma (desde la ficha del repo)</h2>
          <p className="musky-health__section-lead">
            Estos datos salen de <strong>ActionList.metadata.json</strong>, no hace falta pegar nada a mano en el
            dashboard.
          </p>
          <ul className="musky-health__bullet-list">
            <li>
              Archivo:{" "}
              <a className="musky-health__link" href={fd.url} rel="noreferrer" target="_blank">
                Abrir en Figma
              </a>
            </li>
            {fd.page ? <li>Página: {fd.page}</li> : null}
            {fd.componentSet ? <li>Conjunto de referencia: {fd.componentSet}</li> : null}
            {fd.referenceNode ? <li>Nodo de referencia: {fd.referenceNode}</li> : null}
          </ul>
          <Button
            className="musky-health__btn-mt"
            type="button"
            variant="secondary"
            size="md"
            onClick={() => window.open(fd.url!, "_blank", "noopener,noreferrer")}
          >
            Abrir frame de referencia
          </Button>
        </section>
      ) : (
        <section className="musky-health__card">
          <p className="musky-health__narrative">La ficha aún no enlaza archivo de Figma; añádelo en metadata.</p>
        </section>
      )}

      <section className="musky-health__card musky-health__card--stretch">
        <h2 className="musky-health__h2">Estructura (código vs lo documentado)</h2>
        <p className="musky-health__section-lead">{data.structureSummary}</p>
        {data.layoutZonesDeclared?.length ? (
          <p className="musky-health__hint musky-health__hint--tight">
            Zonas declaradas en la ficha: {data.layoutZonesDeclared.join(" · ")}.
          </p>
        ) : null}
        <ul className="musky-health__bullet-list">
          {(data.structureChecks ?? []).map((c) => (
            <li key={c.id} className="musky-health__structure-row">
              <span className={c.ok ? "musky-health__pill musky-health__pill--ok" : "musky-health__pill musky-health__pill--warn"}>
                {c.ok ? "OK" : "Revisar"}
              </span>
              <span>{c.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="musky-health__card musky-health__card--stretch">
        <h2 className="musky-health__h2">Tipografía y estilos de Figma</h2>
        <p className="musky-health__section-lead">
          El código usa variables <code className="musky-health__code">--typography-*</code> de{" "}
          <code className="musky-health__code">tokens.css</code>. Si en Figma los estilos con nombre «Musky/…»
          cambiaron de tamaño, puedes ver texto «correcto en tokens» pero distinto al frame: hay que contrastar a ojo.
        </p>
        {(data.typography?.notes ?? []).map((n) => (
          <p key={n} className="musky-health__narrative">
            {n}
          </p>
        ))}
        <div className="musky-health__two-col">
          <div>
            <h3 className="musky-health__h3">Referencias en la ficha (muestra)</h3>
            <ul className="musky-health__bullet-list musky-health__bullet-list--tight">
              {(data.typography?.metadataRefsSample ?? []).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="musky-health__h3">Variables en CSS (muestra)</h3>
            <ul className="musky-health__bullet-list musky-health__bullet-list--tight">
              {(data.typography?.cssVariablesSample ?? []).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {(data.warnings?.length ?? 0) > 0 ? (
        <section className="musky-health__card musky-health__card--warn">
          <h2 className="musky-health__h2">Señales a revisar con diseño</h2>
          <ul className="musky-health__bullet-list">
            {(data.warnings ?? []).map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          {data.hygiene ? (
            <p className="musky-health__hint musky-health__hint--tight">
              Píxeles fijos detectados en la hoja de estilos del componente: {data.hygiene.rawPxTokensheetCount}{" "}
              apariciones (incluye márgenes/paddings del chip, etc.).
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
