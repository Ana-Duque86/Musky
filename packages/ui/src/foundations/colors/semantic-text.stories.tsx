import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import { semanticText } from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Semantic/Text",
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
        title="Text"
        description="Roles de color para texto: principal, apoyo, disabled, inverso y enfasis."
      >
        <TokenGrid tokens={semanticText} />
      </CatalogSection>
    </CatalogShell>
  )
};
