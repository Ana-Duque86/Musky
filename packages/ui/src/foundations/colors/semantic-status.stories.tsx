import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import {
  semanticStatusDanger,
  semanticStatusInfo,
  semanticStatusPromo,
  semanticStatusSuccess,
  semanticStatusWarning
} from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Semantic/Status",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Semantic / Status" title="Info">
        <TokenGrid tokens={semanticStatusInfo} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Warning: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Semantic / Status" title="Warning">
        <TokenGrid tokens={semanticStatusWarning} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Success: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Semantic / Status" title="Success">
        <TokenGrid tokens={semanticStatusSuccess} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Danger: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Semantic / Status" title="Danger">
        <TokenGrid tokens={semanticStatusDanger} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Promo: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Semantic / Status" title="Promo" description="Banners y mensajes promocionales con menta y bosque.">
        <TokenGrid tokens={semanticStatusPromo} />
      </CatalogSection>
    </CatalogShell>
  )
};
