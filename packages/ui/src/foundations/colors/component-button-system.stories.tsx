import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import {
  componentAvatar,
  componentButtonVariants,
  componentIconButtonVariants,
  componentSegmentedControl
} from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Component/Button-system",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Component / Button System" title="Button" description="Variantes primary, secondary, tertiary, link y disabled.">
        <TokenGrid tokens={componentButtonVariants} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const IconButton: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Component / Button System" title="IconButton" description="Jerarquia alineada con Button mas badge de notificaciones.">
        <TokenGrid tokens={componentIconButtonVariants} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const SegmentedControl: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Component / Button System" title="SegmentedControl" description="Grupo, borde, opcion inactiva y activa.">
        <TokenGrid tokens={componentSegmentedControl} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Avatar: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Component / Button System" title="Avatar" description="Colores de avatar usuario en fallback y borde.">
        <TokenGrid tokens={componentAvatar} />
      </CatalogSection>
    </CatalogShell>
  )
};
