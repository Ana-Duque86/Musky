import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import {
  componentBannerDanger,
  componentBannerInfo,
  componentBannerPromo,
  componentBannerWarning
} from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Component/Banner",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Component / Banner" title="Info">
        <TokenGrid tokens={componentBannerInfo} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Warning: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Component / Banner" title="Warning">
        <TokenGrid tokens={componentBannerWarning} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Promo: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Component / Banner" title="Promo">
        <TokenGrid tokens={componentBannerPromo} />
      </CatalogSection>
    </CatalogShell>
  )
};

export const Danger: Story = {
  render: () => (
    <CatalogShell>
      <CatalogSection eyebrow="Component / Banner" title="Danger">
        <TokenGrid tokens={componentBannerDanger} />
      </CatalogSection>
    </CatalogShell>
  )
};
