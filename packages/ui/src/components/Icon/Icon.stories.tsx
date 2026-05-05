import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import {
  semanticIconIntentTokens,
  semanticStatusIconOnlyTokens
} from "../../foundations/colors/color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "../../foundations/colors/color-catalog-ui";
import { Icon, type IconName, type IconSize, type IconTone } from "./Icon";

const FIGMA_ICONS_PAGE =
  "https://www.figma.com/design/q9gY8GgGHuGhrQ4iZ7Uo1e/Components?node-id=141-896";

const iconNames: IconName[] = [
  "microchip",
  "medicalDocument",
  "injection",
  "care",
  "notifications",
  "notificationsBadge",
  "present"
];

const iconTones: IconTone[] = [
  "primary",
  "secondary",
  "muted",
  "inverse",
  "brand",
  "brandPink",
  "accent",
  "success",
  "warning",
  "danger",
  "info",
  "promo"
];

const sizes: IconSize[] = ["sm", "md", "lg"];

const meta = {
  title: "Foundations/Icons",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Glifos duotono de la pagina **Icons** en Figma ([Components, node 141:896](${FIGMA_ICONS_PAGE})). viewBox 38×38; capas usan \`semantic/icon/duo/*\`.

**Claves \`name\` (Figma):** \`microchip\`, \`medicalDocument\` (59:1493), \`injection\` (59:1513), \`care\` (59:1519), \`notifications\` (141:962), \`notificationsBadge\` (141:963), \`present\` (141:964).`
      }
    }
  },
  argTypes: {
    name: { control: "select", options: iconNames },
    size: { control: "select", options: sizes },
    tone: { control: "select", options: iconTones }
  }
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    name: "microchip",
    size: "md",
    tone: "primary"
  },
  render: (args) => <Icon {...args} />
};

export const Catalog: Story = {
  args: {
    name: "microchip",
    size: "md",
    tone: "primary"
  },
  render: () => (
    <CatalogShell>
      <CatalogSection
        eyebrow="Figma"
        title="Icon / Action"
        description={`Página de referencia en Figma: ${FIGMA_ICONS_PAGE} (Components → Icons, node 141:896). Los tokens de color siguen la nomenclatura semantic/icon/* del archivo.`}
      >
        <p style={{ color: "var(--semantic-text-secondary)", fontSize: 14, lineHeight: "22px", margin: 0 }}>
          Tamaños: <code style={{ fontSize: 13 }}>--layout-icon-size-sm</code> (24px),{" "}
          <code style={{ fontSize: 13 }}>--layout-icon-size-md</code> (38px),{" "}
          <code style={{ fontSize: 13 }}>--layout-icon-size-lg</code> (48px).
        </p>
      </CatalogSection>

      <CatalogSection eyebrow="Semantic" title="Tokens de color (intents de icono)">
        <TokenGrid tokens={semanticIconIntentTokens} />
      </CatalogSection>

      <CatalogSection
        eyebrow="Semantic / Status"
        title="Tokens de icono por estado"
        description="Se usan con la prop `tone` en success, warning, danger, info y promo."
      >
        <TokenGrid tokens={semanticStatusIconOnlyTokens} />
      </CatalogSection>

      <CatalogSection eyebrow="Componente" title="Matriz glifo × tamaño">
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: `120px repeat(${sizes.length}, minmax(0, 1fr))`,
            maxWidth: 520
          }}
        >
          <span />
          {sizes.map((s) => (
            <span
              key={s}
              style={{
                color: "var(--semantic-text-secondary)",
                fontSize: 12,
                fontWeight: 600,
                textAlign: "center"
              }}
            >
              {s} ({s === "sm" ? "24" : s === "md" ? "38" : "48"}px)
            </span>
          ))}
          {iconNames.flatMap((name) => [
            <span
              key={`${name}-label`}
              style={{
                alignSelf: "center",
                color: "var(--semantic-text-primary)",
                fontSize: 13,
                fontWeight: 600
              }}
            >
              {name}
            </span>,
            ...sizes.map((size) => (
              <span
                key={`${name}-${size}`}
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  minHeight: 56
                }}
              >
                <Icon name={name} size={size} tone="primary" />
              </span>
            ))
          ])}
        </div>
      </CatalogSection>

      <CatalogSection eyebrow="Componente" title="Tintes (microchip de ejemplo)">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, rowGap: 16 }}>
          {iconTones.map((tone) => (
            <div
              key={tone}
              style={{
                alignItems: "center",
                background:
                  tone === "inverse" ? "var(--semantic-action-tertiary-bg)" : "var(--semantic-background-surface)",
                border: "1px solid var(--semantic-border-subtle)",
                borderRadius: 12,
                display: "grid",
                gap: 8,
                justifyItems: "center",
                minWidth: 100,
                padding: 14
              }}
            >
              <Icon name="microchip" size="md" tone={tone} />
              <code style={{ color: "var(--semantic-text-secondary)", fontSize: 11 }}>{tone}</code>
            </div>
          ))}
        </div>
      </CatalogSection>
    </CatalogShell>
  )
};
