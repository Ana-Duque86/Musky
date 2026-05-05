import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import { semanticBorderIconFocus } from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Semantic/Border-icon-focus",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tokens: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection
        eyebrow="Semantic"
        title="Border, iconos (intents) y focus"
        description="Bordes sutiles, intents de color de icono (primary, secondary, muted, inverse, brand, accent) y anillo de foco accesible. Para matriz de glifos y tamaños ver Foundations/Icons."
      >
        <TokenGrid tokens={semanticBorderIconFocus} />
      </CatalogSection>
    </CatalogShell>
  )
};
