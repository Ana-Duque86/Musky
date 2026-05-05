import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import { semanticRewards } from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Semantic/Rewards",
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
        title="Rewards highlight"
        description="Alias semanticos para chips y entradas de recompensas."
      >
        <TokenGrid tokens={semanticRewards} />
      </CatalogSection>
    </CatalogShell>
  )
};
