import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import {
  primitivesStatusDanger,
  primitivesStatusInfo,
  primitivesStatusPromo,
  primitivesStatusSuccess,
  primitivesStatusWarning
} from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Primitives/Status",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Primitives / Status" title="Success" description="Superficie y contenido para estados positivos.">
        <TokenGrid tokens={primitivesStatusSuccess} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Warning: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Primitives / Status" title="Warning" description="Superficie y contenido para advertencias.">
        <TokenGrid tokens={primitivesStatusWarning} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Danger: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Primitives / Status" title="Danger" description="Superficie y contenido para error o riesgo.">
        <TokenGrid tokens={primitivesStatusDanger} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Info: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Primitives / Status" title="Info" description="Superficie y contenido informativos.">
        <TokenGrid tokens={primitivesStatusInfo} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Promo: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Primitives / Status" title="Promo" description="Superficie menta y contenido bosque para mensajes promo.">
        <TokenGrid tokens={primitivesStatusPromo} />
      </CatalogSection>
    </CatalogShell>
  )
};
