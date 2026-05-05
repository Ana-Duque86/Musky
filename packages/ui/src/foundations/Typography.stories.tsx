import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "../styles/typography.css";

type TypeStyle = {
  name: string;
  type: string;
  use: string;
  weight: string;
  size: string;
  lineHeight: string;
  className: string;
  sample: string;
};

const typeStyles: TypeStyle[] = [
  {
    name: "Display",
    type: "Heading",
    use: "Hero / onboarding",
    weight: "Bold",
    size: "40px",
    lineHeight: "48px",
    className: "musky-text--display",
    sample: "Bienvenido"
  },
  {
    name: "H1",
    type: "Heading",
    use: "Titulos principales",
    weight: "Bold",
    size: "32px",
    lineHeight: "40px",
    className: "musky-text--h1",
    sample: "Mis mascotas"
  },
  {
    name: "H2",
    type: "Heading",
    use: "Secciones",
    weight: "Semibold",
    size: "24px",
    lineHeight: "32px",
    className: "musky-text--h2",
    sample: "Acciones"
  },
  {
    name: "H3",
    type: "Heading",
    use: "Subsecciones",
    weight: "Semibold",
    size: "20px",
    lineHeight: "28px",
    className: "musky-text--h3",
    sample: "Vacunas"
  },
  {
    name: "Body Large",
    type: "Texto",
    use: "Contenido principal",
    weight: "Regular",
    size: "18px",
    lineHeight: "28px",
    className: "musky-text--body-large",
    sample: "Texto descriptivo para una pantalla importante."
  },
  {
    name: "Body",
    type: "Texto",
    use: "Texto estandar",
    weight: "Regular",
    size: "16px",
    lineHeight: "24px",
    className: "musky-text--body",
    sample: "Completa la informacion de tu mascota."
  },
  {
    name: "Body Small",
    type: "Texto",
    use: "Texto secundario",
    weight: "Regular",
    size: "14px",
    lineHeight: "20px",
    className: "musky-text--body-small",
    sample: "Informacion extra"
  },
  {
    name: "Label",
    type: "UI",
    use: "Botones y controles",
    weight: "Medium",
    size: "18px",
    lineHeight: "24px",
    className: "musky-text--label",
    sample: "Continuar"
  },
  {
    name: "Label Small",
    type: "UI",
    use: "Chips y etiquetas compactas",
    weight: "Medium",
    size: "14px",
    lineHeight: "20px",
    className: "musky-text--label-small",
    sample: "Activo"
  },
  {
    name: "Caption",
    type: "UI",
    use: "Metadata",
    weight: "Regular",
    size: "12px",
    lineHeight: "16px",
    className: "musky-text--caption",
    sample: "Hace 2 dias"
  },
  {
    name: "Overline",
    type: "UI",
    use: "Categorias",
    weight: "Medium",
    size: "12px",
    lineHeight: "16px",
    className: "musky-text--overline",
    sample: "Recomendado"
  }
];

const internalElements = [
  ["Font family", "Token", "Si", "Tipografia base"],
  ["Font size", "Token", "Si", "Tamano"],
  ["Font weight", "Token", "Si", "Peso"],
  ["Line height", "Token", "Si", "Espaciado vertical"],
  ["Letter spacing", "Token", "Opcional", "Ajuste fino"],
  ["Color", "Token", "Si", "Color semantico"],
  ["Transform", "Regla", "Opcional", "Uppercase u otra transformacion"]
];

const properties = [
  [
    "style",
    "display / h1 / h2 / h3 / body-large / body / body-small / label / label-small / caption / overline"
  ],
  ["weight", "regular / medium / semibold / bold"],
  ["emphasis", "default / high / low"],
  ["colorRole", "primary / secondary / inverse / disabled / highlight"],
  ["truncate", "true / false"],
  ["align", "left / center / right"]
];

const states = [
  ["Default", "Texto normal", "musky-text--body"],
  ["Secondary", "Menor jerarquia", "musky-text--body musky-text--secondary"],
  ["Disabled", "Baja visibilidad", "musky-text--body musky-text--disabled"],
  ["Inverse", "Sobre fondo oscuro", "musky-text--body musky-text--inverse"],
  ["Highlight", "Enfasis", "musky-text--body musky-text--highlight"]
];

const dataRows = [
  ["text_id", "string", "Identificador de texto", "txt_001", "global"],
  ["text_value", "string", "Contenido", "Hola Eduardo", "global"],
  ["text_type", "enum", "Estilo base (rampa)", "h1 / body / label / …", "typography"],
  ["text_priority", "enum", "Nivel jerarquico", "high / medium / low", "UI"],
  ["text_role", "enum", "Rol semantico", "title / description / action", "global"],
  ["text_state", "enum", "Estado visual", "default / disabled", "UI"],
  ["text_align", "enum", "Alineacion", "left", "layout"],
  ["text_truncate", "boolean", "Si se corta", "false", "UI"],
  ["text_max_lines", "number", "Max lineas", "2", "cards"],
  ["text_emphasis", "enum", "Enfasis", "strong / subtle", "UI"]
];

const pageStyle: CSSProperties = {
  background: "var(--semantic-background-app)",
  boxSizing: "border-box",
  color: "var(--semantic-text-primary)",
  display: "grid",
  gap: 40,
  minHeight: "100vh",
  padding: 32,
  width: "100%"
};

function Table({
  headers,
  rows
}: {
  headers: string[];
  rows: Array<Array<string>>;
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          borderCollapse: "collapse",
          fontFamily: "var(--typography-body-font-family)",
          fontSize: "var(--typography-body-small-font-size)",
          lineHeight: "var(--typography-body-small-line-height)",
          minWidth: 720,
          width: "100%"
        }}
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  background: "var(--semantic-background-surface-alt)",
                  border: "1px solid var(--semantic-border-subtle)",
                  color: "var(--semantic-text-primary)",
                  padding: 12,
                  textAlign: "left"
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => (
                <td
                  key={cell}
                  style={{
                    border: "1px solid var(--semantic-border-subtle)",
                    color: "var(--semantic-text-secondary)",
                    padding: 12,
                    verticalAlign: "top"
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StylePreview({ style }: { style: TypeStyle }) {
  return (
    <article
      style={{
        border: "1px solid var(--semantic-border-subtle)",
        borderRadius: 16,
        display: "grid",
        gap: 12,
        padding: 20
      }}
    >
      <p className={`musky-text ${style.className}`}>{style.sample}</p>
      <div
        style={{
          color: "var(--semantic-text-secondary)",
          display: "grid",
          fontSize: 13,
          gap: 4,
          lineHeight: "18px"
        }}
      >
        <strong style={{ color: "var(--semantic-text-primary)" }}>{style.name}</strong>
        <span>
          {style.type} / {style.use}
        </span>
        <code>
          {style.weight}, {style.size} / {style.lineHeight}
        </code>
      </div>
    </article>
  );
}

function TypographyCatalog() {
  return (
    <main style={pageStyle}>
      <header style={{ display: "grid", gap: 8, maxWidth: 820 }}>
        <p className="musky-text musky-text--overline musky-text--highlight">Musky Typography</p>
        <h1 className="musky-text musky-text--display">Typography System</h1>
        <p className="musky-text musky-text--body-large musky-text--secondary">
          Tres capas: estilos base (como se ve), roles de texto (`text_role`) y reglas por componente.
          Los estilos globales son la rampa; Button/Link/Chip no son estilos paralelos.
        </p>
      </header>

      <section style={{ display: "grid", gap: 16 }}>
        <h2 className="musky-text musky-text--h2">Estilos base</h2>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {typeStyles.map((style) => (
            <StylePreview key={style.name} style={style} />
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: 16 }}>
        <h2 className="musky-text musky-text--h2">Elementos internos del estilo</h2>
        <Table headers={["Elemento", "Tipo", "Obligatorio", "Descripcion"]} rows={internalElements} />
      </section>

      <section style={{ display: "grid", gap: 16 }}>
        <h2 className="musky-text musky-text--h2">Properties</h2>
        <Table headers={["Property", "Valores"]} rows={properties} />
      </section>

      <section style={{ display: "grid", gap: 16 }}>
        <h2 className="musky-text musky-text--h2">Estados</h2>
        <div style={{ display: "grid", gap: 12 }}>
          {states.map(([name, description, className]) => (
            <div
              key={name}
              style={{
                background: name === "Inverse" ? "var(--color-brand-wine)" : "var(--semantic-background-surface)",
                border: "1px solid var(--semantic-border-subtle)",
                borderRadius: 16,
                display: "grid",
                gap: 4,
                padding: 16
              }}
            >
              <p className={`musky-text ${className}`}>{name}: Texto de ejemplo</p>
              <p className={`musky-text musky-text--caption ${name === "Inverse" ? "musky-text--inverse" : "musky-text--secondary"}`}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: 16 }}>
        <h2 className="musky-text musky-text--h2">Roles de texto (`text_role`)</h2>
        <Table
          headers={["text_role", "Suele usar estilo base"]}
          rows={[
            ["title", "Display / H1 / H2"],
            ["subtitle", "H2 / H3"],
            ["description", "Body Large / Body"],
            ["action", "Label"],
            ["metadata", "Caption"],
            ["status", "Label Small / Overline"],
            ["helper", "Body Small / Caption"],
            ["error", "Caption + color error"]
          ]}
        />
      </section>

      <section style={{ display: "grid", gap: 16 }}>
        <h2 className="musky-text musky-text--h2">Uso tipografico por componente</h2>
        <p className="musky-text musky-text--body musky-text--secondary">
          Reglas de implementacion: mismo estilo base + tokens del componente. No hay rampas aparte
          tipo “Button Text style”.
        </p>
        <Table
          headers={["Componente / pieza", "Estilo base", "Notas"]}
          rows={[
            ["Button label", "Label", "Tokens semantic/action del boton"],
            ["Link", "Body + medium", "`.musky-text--link`: Body + color enlace + underline"],
            ["Chip", "Label Small u Overline", "Uppercase opcional en Overline"],
            ["Input label", "Label", "Texto primario"],
            ["Input helper / error", "Body Small / Caption", "Color segun estado"]
          ]}
        />
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <StylePreview
            style={{
              name: "Link (binding)",
              type: "Body + link",
              use: "Enlace",
              weight: "Medium",
              size: "16px",
              lineHeight: "24px",
              className: "musky-text--link",
              sample: "Ver condiciones"
            }}
          />
          <StylePreview
            style={{
              name: "Button (binding)",
              type: "Label",
              use: "Etiqueta de boton",
              weight: "Medium",
              size: "18px",
              lineHeight: "24px",
              className: "musky-text--label",
              sample: "Continuar"
            }}
          />
          <StylePreview
            style={{
              name: "Chip (binding)",
              type: "Overline",
              use: "Estado corto",
              weight: "Medium",
              size: "12px",
              lineHeight: "16px",
              className: "musky-text--overline",
              sample: "Urgente"
            }}
          />
          <StylePreview
            style={{
              name: "Input helper (binding)",
              type: "Body Small",
              use: "Ayuda",
              weight: "Regular",
              size: "14px",
              lineHeight: "20px",
              className: "musky-text--body-small musky-text--secondary",
              sample: "Usa el nombre de tu mascota"
            }}
          />
        </div>
      </section>

      <section style={{ display: "grid", gap: 16 }}>
        <h2 className="musky-text musky-text--h2">Modelo de data</h2>
        <Table
          headers={["field_id", "type", "description", "example", "used_by"]}
          rows={dataRows}
        />
      </section>
    </main>
  );
}

const meta = {
  title: "Foundations/Typography/System",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sistema global de estilos tipograficos. No pertenece a componentes especificos."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Catalog: Story = {
  render: () => <TypographyCatalog />
};
