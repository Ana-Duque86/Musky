import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../styles/tokens.css";
import {
  componentAvatar,
  componentBannerDanger,
  componentBannerInfo,
  componentBannerPromo,
  componentBannerWarning,
  componentButtonVariants,
  componentIconButtonVariants,
  componentSegmentedControl,
  primitivesBrandGreen,
  primitivesBrandPinkWine,
  primitivesNeutralScale,
  primitivesNeutralSpecial,
  primitivesRewards,
  primitivesSocial,
  primitivesStatusDanger,
  primitivesStatusInfo,
  primitivesStatusPromo,
  primitivesStatusSuccess,
  primitivesStatusWarning,
  semanticActionDisabledSelected,
  semanticActionMarketing,
  semanticActionPrimary,
  semanticActionSecondary,
  semanticActionTertiaryLink,
  semanticBackground,
  semanticBorderIconFocus,
  semanticRewards,
  semanticStatusDanger,
  semanticStatusInfo,
  semanticStatusPromo,
  semanticStatusSuccess,
  semanticStatusWarning,
  semanticText
} from "./color-tokens-data";
import { CatalogSection, CatalogShell, TokenGrid } from "./color-catalog-ui";

const meta = {
  title: "Foundations/Colors/Overview",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Indice completo del sistema de color: Primitives, Semantic y Component. Usa las subcarpetas del sidebar para ver cada grupo en detalle."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullCatalog: Story = {
  render: () => (
    <CatalogShell>
      <header style={{ display: "grid", gap: 10, maxWidth: 720 }}>
        <p
          style={{
            color: "var(--semantic-action-link-text)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            margin: 0,
            textTransform: "uppercase"
          }}
        >
          Foundations / Colors
        </p>
        <h1 style={{ color: "var(--semantic-text-primary)", fontSize: 28, lineHeight: "36px", margin: 0 }}>
          Panorama de tokens de color
        </h1>
        <p style={{ color: "var(--semantic-text-secondary)", fontSize: 15, lineHeight: "22px", margin: 0 }}>
          Jerarquia: primitivos por carpeta (neutral, brand, social, status), capa semantica y tokens por componente.
          En el panel lateral de Storybook cada subcarpeta corresponde a un grupo.
        </p>
      </header>

      <CatalogSection eyebrow="Primitives / Neutral" title="Escala y especiales">
        <TokenGrid tokens={[...primitivesNeutralScale, ...primitivesNeutralSpecial]} />
      </CatalogSection>

      <CatalogSection eyebrow="Primitives / Brand" title="Pink, wine, green y rewards">
        <TokenGrid tokens={[...primitivesBrandPinkWine, ...primitivesBrandGreen, ...primitivesRewards]} />
      </CatalogSection>

      <CatalogSection eyebrow="Primitives / Social" title="WhatsApp">
        <TokenGrid tokens={primitivesSocial} />
      </CatalogSection>

      <CatalogSection eyebrow="Primitives / Status (fundaciones)" title="Superficie y contenido por intencion">
        <TokenGrid
          tokens={[
            ...primitivesStatusSuccess,
            ...primitivesStatusWarning,
            ...primitivesStatusDanger,
            ...primitivesStatusInfo,
            ...primitivesStatusPromo
          ]}
        />
      </CatalogSection>

      <CatalogSection eyebrow="Semantic" title="Background y text">
        <TokenGrid tokens={[...semanticBackground, ...semanticText]} />
      </CatalogSection>

      <CatalogSection eyebrow="Semantic" title="Border, icono, foco y rewards">
        <TokenGrid tokens={[...semanticBorderIconFocus, ...semanticRewards]} />
      </CatalogSection>

      <CatalogSection eyebrow="Semantic / Action" title="Acciones">
        <TokenGrid
          tokens={[
            ...semanticActionPrimary,
            ...semanticActionSecondary,
            ...semanticActionTertiaryLink,
            ...semanticActionDisabledSelected,
            ...semanticActionMarketing
          ]}
        />
      </CatalogSection>

      <CatalogSection eyebrow="Semantic / Status" title="Estados semanticos">
        <TokenGrid
          tokens={[
            ...semanticStatusInfo,
            ...semanticStatusWarning,
            ...semanticStatusSuccess,
            ...semanticStatusDanger,
            ...semanticStatusPromo
          ]}
        />
      </CatalogSection>

      <CatalogSection eyebrow="Component / Banner" title="Banner por intencion">
        <TokenGrid
          tokens={[
            ...componentBannerInfo,
            ...componentBannerWarning,
            ...componentBannerPromo,
            ...componentBannerDanger
          ]}
        />
      </CatalogSection>

      <CatalogSection eyebrow="Component / Button System" title="Button, IconButton, SegmentedControl, Avatar">
        <TokenGrid
          tokens={[
            ...componentButtonVariants,
            ...componentIconButtonVariants,
            ...componentSegmentedControl,
            ...componentAvatar
          ]}
        />
      </CatalogSection>
    </CatalogShell>
  )
};
