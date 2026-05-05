import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import {
  primitivesNeutralScale,
  primitivesNeutralSpecial
} from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Primitives/Neutral",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection
        eyebrow="Primitives / Neutral"
        title="Escala"
        description="Neutrales numericos: superficies, texto, bordes y tintas."
      >
        <TokenGrid tokens={primitivesNeutralScale} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Special: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection
        eyebrow="Primitives / Neutral"
        title="Especiales"
        description="Casos que no siguen la escala numerica."
      >
        <TokenGrid tokens={primitivesNeutralSpecial} />
      </CatalogSection>
    </CatalogShell>
  )
};
