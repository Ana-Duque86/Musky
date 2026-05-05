import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import { primitivesSocial } from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Primitives/Social",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const WhatsApp: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection
        eyebrow="Primitives / Social"
        title="WhatsApp"
        description="Red social y CTAs asociados al icono de WhatsApp; no es brand green."
      >
        <TokenGrid tokens={primitivesSocial} />
      </CatalogSection>
    </CatalogShell>
  )
};
