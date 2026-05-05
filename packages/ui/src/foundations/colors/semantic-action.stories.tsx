import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import {
  semanticActionDisabledSelected,
  semanticActionMarketing,
  semanticActionPrimary,
  semanticActionSecondary,
  semanticActionTertiaryLink
} from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Semantic/Action",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Semantic / Action" title="Primary" description="Boton principal rosa y texto oscuro.">
        <TokenGrid tokens={semanticActionPrimary} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Secondary: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Semantic / Action" title="Secondary" description="Outline: fondo transparente y borde rosa.">
        <TokenGrid tokens={semanticActionSecondary} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const TertiaryAndLink: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Semantic / Action" title="Tertiary y link" description="Wine solido y texto de enlace.">
        <TokenGrid tokens={semanticActionTertiaryLink} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const DisabledAndSelected: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Semantic / Action" title="Disabled y seleccion" description="Estados no interactivos y segmento activo.">
        <TokenGrid tokens={semanticActionDisabledSelected} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Marketing: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Semantic / Action" title="Marketing" description="CTA tipo WhatsApp u ofertas de alto contraste.">
        <TokenGrid tokens={semanticActionMarketing} />
      </CatalogSection>
    </CatalogShell>
  )
};
