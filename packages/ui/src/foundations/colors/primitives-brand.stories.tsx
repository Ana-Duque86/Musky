import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import {
  primitivesBrandGreen,
  primitivesBrandPinkWine,
  primitivesRewards
} from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Primitives/Brand",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const PinkAndWine: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection
        eyebrow="Primitives / Brand"
        title="Pink y wine"
        description="Colores de marca primarios del producto."
      >
        <TokenGrid tokens={primitivesBrandPinkWine} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Green: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection
        eyebrow="Primitives / Brand"
        title="Green"
        description="Verdes de marca para promo y jerarquia oscura sobre superficies claras."
      >
        <TokenGrid tokens={primitivesBrandGreen} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const RewardsHighlight: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection
        eyebrow="Primitives / Brand"
        title="Rewards highlight"
        description="Primitivo alineado al pink para chips de recompensas."
      >
        <TokenGrid tokens={primitivesRewards} />
      </CatalogSection>
    </CatalogShell>
  )
};
