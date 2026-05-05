export type ColorTokenItem = {
  name: string;
  cssVar: string;
  value: string;
  role: string;
};

/** Primitives / Neutral */
export const primitivesNeutralScale: ColorTokenItem[] = [
  { name: "color/neutral/0", cssVar: "--color-neutral-0", value: "#FFFFFF", role: "Superficie base, tipico blanco puro" },
  { name: "color/neutral/100", cssVar: "--color-neutral-100", value: "#FAFAFA", role: "Superficie alternativa muy suave" },
  { name: "color/neutral/200", cssVar: "--color-neutral-200", value: "#EAEBEB", role: "Bordes sutiles, fondos disabled" },
  { name: "color/neutral/500", cssVar: "--color-neutral-500", value: "#A0A3A7", role: "Texto terciario, iconos disabled" },
  { name: "color/neutral/600", cssVar: "--color-neutral-600", value: "#6C7074", role: "Texto secundario" },
  { name: "color/neutral/700", cssVar: "--color-neutral-700", value: "#4E5255", role: "Bordes fuertes" },
  { name: "color/neutral/900", cssVar: "--color-neutral-900", value: "#1E1F1F", role: "Texto principal e iconos" },
  { name: "color/neutral/950", cssVar: "--color-neutral-950", value: "#111010", role: "Neutral muy profundo" },
  { name: "color/neutral/1000", cssVar: "--color-neutral-1000", value: "#000000", role: "Tinta maxima cuando se requiere negro puro" }
];

export const primitivesNeutralSpecial: ColorTokenItem[] = [
  { name: "color/neutral/transparent", cssVar: "--color-neutral-transparent", value: "#FFFFFF00", role: "Transparencia sobre fondos (alias semantico)" }
];

/** Primitives / Brand */
export const primitivesBrandPinkWine: ColorTokenItem[] = [
  { name: "color/brand/pink", cssVar: "--color-brand-pink", value: "#FFB3D2", role: "Marca primaria, acciones principales" },
  { name: "color/brand/wine", cssVar: "--color-brand-wine", value: "#4E080C", role: "Marca vino, terciario y seleccion" }
];

export const primitivesBrandGreen: ColorTokenItem[] = [
  { name: "color/brand/green/accentDeep", cssVar: "--color-brand-green-accent-deep", value: "#005840", role: "Verde bosque: promo, titulos sobre superficies claras" },
  { name: "color/brand/green/promoLime", cssVar: "--color-brand-green-promo-lime", value: "#A8DC18", role: "Lima promo (primitivo de marca)" }
];

export const primitivesRewards: ColorTokenItem[] = [
  { name: "color/rewards/highlight", cssVar: "--color-rewards-highlight", value: "#FFB3D2", role: "Destacado de recompensas (alinea con pink)" }
];

/** Primitives / Social */
export const primitivesSocial: ColorTokenItem[] = [
  { name: "color/social/whatsapp", cssVar: "--color-social-whatsapp", value: "#1EAE54", role: "WhatsApp y CTAs sociales (no brand green)" }
];

/** Primitives / Status — superficies y contenido por intencion */
export const primitivesStatusSuccess: ColorTokenItem[] = [
  { name: "color/success/surface", cssVar: "--color-success-surface", value: "#E8F8EF", role: "Fondo estado exito" },
  { name: "color/success/onSurface", cssVar: "--color-success-on-surface", value: "#0F5132", role: "Texto e icono sobre exito" }
];

export const primitivesStatusWarning: ColorTokenItem[] = [
  { name: "color/warning/surface", cssVar: "--color-warning-surface", value: "#FFF8E6", role: "Fondo advertencia" },
  { name: "color/warning/onSurface", cssVar: "--color-warning-on-surface", value: "#8B5A00", role: "Texto e icono sobre advertencia" }
];

export const primitivesStatusDanger: ColorTokenItem[] = [
  { name: "color/danger/surface", cssVar: "--color-danger-surface", value: "#FCECEF", role: "Fondo error o peligro" },
  { name: "color/danger/onSurface", cssVar: "--color-danger-on-surface", value: "#450408", role: "Texto e icono sobre peligro" }
];

export const primitivesStatusInfo: ColorTokenItem[] = [
  { name: "color/info/surface", cssVar: "--color-info-surface", value: "#E8F4FD", role: "Fondo informacion" },
  { name: "color/info/onSurface", cssVar: "--color-info-on-surface", value: "#1565C0", role: "Texto e icono sobre info" }
];

export const primitivesStatusPromo: ColorTokenItem[] = [
  { name: "color/promo/surface", cssVar: "--color-promo-surface", value: "#E8F6EE", role: "Fondo promo / marketing suave" },
  { name: "color/promo/onSurface", cssVar: "--color-promo-on-surface", value: "#005840", role: "Texto promo sobre superficie menta" }
];

/** Semantic / Background */
export const semanticBackground: ColorTokenItem[] = [
  { name: "semantic/background/app", cssVar: "--semantic-background-app", value: "#FFFFFF", role: "Fondo de aplicacion" },
  { name: "semantic/background/surface", cssVar: "--semantic-background-surface", value: "#FFFFFF", role: "Tarjetas y superficies de controles" },
  { name: "semantic/background/surfaceAlt", cssVar: "--semantic-background-surface-alt", value: "#FAFAFA", role: "Superficie alternativa (zonas agrupadas)" }
];

/** Semantic / Text */
export const semanticText: ColorTokenItem[] = [
  { name: "semantic/text/primary", cssVar: "--semantic-text-primary", value: "#1E1F1F", role: "Cuerpo y titulos por defecto" },
  { name: "semantic/text/secondary", cssVar: "--semantic-text-secondary", value: "#6C7074", role: "Texto de apoyo" },
  { name: "semantic/text/disabled", cssVar: "--semantic-text-disabled", value: "#A0A3A7", role: "Texto deshabilitado" },
  { name: "semantic/text/inverse", cssVar: "--semantic-text-inverse", value: "#FFFFFF", role: "Texto sobre fondos oscuros o wine" },
  { name: "semantic/text/highlight", cssVar: "--semantic-text-highlight", value: "#4E080C", role: "Enfasis de marca (wine)" }
];

/** Semantic / Border, icon (intents) y focus */
export const semanticBorderIconFocus: ColorTokenItem[] = [
  { name: "semantic/border/subtle", cssVar: "--semantic-border-subtle", value: "#EAEBEB", role: "Divisiones y bordes de controles" },
  { name: "semantic/icon/primary", cssVar: "--semantic-icon-primary", value: "#1E1F1F", role: "Iconografia principal (listas, acciones)" },
  { name: "semantic/icon/secondary", cssVar: "--semantic-icon-secondary", value: "#6C7074", role: "Icono de apoyo o filas informativas" },
  { name: "semantic/icon/muted", cssVar: "--semantic-icon-muted", value: "#A0A3A7", role: "Icono muy suave o desactivado" },
  { name: "semantic/icon/inverse", cssVar: "--semantic-icon-inverse", value: "#FFFFFF", role: "Icono sobre fondos oscuros" },
  { name: "semantic/icon/brand", cssVar: "--semantic-icon-brand", value: "#4E080C", role: "Acento marca wine" },
  { name: "semantic/icon/accent", cssVar: "--semantic-icon-accent", value: "#005840", role: "Acento bosque / promo" },
  { name: "semantic/icon/duo/a", cssVar: "--semantic-icon-duo-a", value: "#005840", role: "Duotono: capa principal (Aqua Deep / iconos Figma)" },
  { name: "semantic/icon/duo/b", cssVar: "--semantic-icon-duo-b", value: "#A8DC18", role: "Duotono: acento lima (Inch Worm)" },
  { name: "semantic/icon/duo/badge", cssVar: "--semantic-icon-duo-badge", value: "#FFB3D2", role: "Badge circular (campana con contador)" },
  { name: "semantic/focus/ring", cssVar: "--semantic-focus-ring", value: "#1A73E8", role: "Anillo de foco teclado (valor literal en CSS)" }
];

/** Subconjunto para catalogo de iconos (intents generales). */
export const semanticIconIntentTokens: ColorTokenItem[] = semanticBorderIconFocus.filter((t) =>
  t.name.startsWith("semantic/icon/")
);

/** Semantic / Action */
export const semanticActionPrimary: ColorTokenItem[] = [
  { name: "semantic/action/primary/bg", cssVar: "--semantic-action-primary-bg", value: "#FFB3D2", role: "Fondo boton primario" },
  { name: "semantic/action/primary/text", cssVar: "--semantic-action-primary-text", value: "#1E1F1F", role: "Texto sobre primario" }
];

export const semanticActionSecondary: ColorTokenItem[] = [
  { name: "semantic/action/secondary/bg", cssVar: "--semantic-action-secondary-bg", value: "transparent", role: "Fondo secundario (outline)" },
  { name: "semantic/action/secondary/text", cssVar: "--semantic-action-secondary-text", value: "#1E1F1F", role: "Texto secundario" },
  { name: "semantic/action/secondary/border", cssVar: "--semantic-action-secondary-border", value: "#FFB3D2", role: "Borde secundario" }
];

export const semanticActionTertiaryLink: ColorTokenItem[] = [
  { name: "semantic/action/tertiary/bg", cssVar: "--semantic-action-tertiary-bg", value: "#4E080C", role: "Fondo terciario (wine)" },
  { name: "semantic/action/tertiary/text", cssVar: "--semantic-action-tertiary-text", value: "#FFFFFF", role: "Texto sobre terciario" },
  { name: "semantic/action/link/text", cssVar: "--semantic-action-link-text", value: "#4E080C", role: "Enlaces y link button" }
];

export const semanticActionDisabledSelected: ColorTokenItem[] = [
  { name: "semantic/action/disabled/bg", cssVar: "--semantic-action-disabled-bg", value: "#EAEBEB", role: "Fondo deshabilitado" },
  { name: "semantic/action/disabled/text", cssVar: "--semantic-action-disabled-text", value: "#6C7074", role: "Texto deshabilitado" },
  { name: "semantic/action/selected/bg", cssVar: "--semantic-action-selected-bg", value: "#4E080C", role: "Segmento seleccionado" },
  { name: "semantic/action/selected/text", cssVar: "--semantic-action-selected-text", value: "#FFFFFF", role: "Texto en segmento seleccionado" }
];

export const semanticActionMarketing: ColorTokenItem[] = [
  { name: "semantic/action/marketing/bg", cssVar: "--semantic-action-marketing-bg", value: "#1EAE54", role: "CTA marketing (WhatsApp)" },
  { name: "semantic/action/marketing/text", cssVar: "--semantic-action-marketing-text", value: "#FFFFFF", role: "Texto sobre marketing" },
  { name: "semantic/action/marketing/icon", cssVar: "--semantic-action-marketing-icon", value: "#FFFFFF", role: "Icono sobre marketing" }
];

export const semanticRewards: ColorTokenItem[] = [
  { name: "semantic/rewards/highlight/bg", cssVar: "--semantic-rewards-highlight-bg", value: "#FFB3D2", role: "Fondo destacado recompensas" },
  { name: "semantic/rewards/highlight/border", cssVar: "--semantic-rewards-highlight-border", value: "#FFB3D2", role: "Borde destacado recompensas" },
  { name: "semantic/rewards/highlight/icon", cssVar: "--semantic-rewards-highlight-icon", value: "#1E1F1F", role: "Icono en chip de recompensas" }
];

/** Semantic / Status — por variante */
export const semanticStatusInfo: ColorTokenItem[] = [
  { name: "semantic/status/info/bg", cssVar: "--semantic-status-info-bg", value: "#E8F4FD", role: "Superficie info" },
  { name: "semantic/status/info/text", cssVar: "--semantic-status-info-text", value: "#1565C0", role: "Texto info" },
  { name: "semantic/status/info/icon", cssVar: "--semantic-status-info-icon", value: "#1565C0", role: "Icono info" }
];

export const semanticStatusWarning: ColorTokenItem[] = [
  { name: "semantic/status/warning/bg", cssVar: "--semantic-status-warning-bg", value: "#FFF8E6", role: "Superficie advertencia" },
  { name: "semantic/status/warning/text", cssVar: "--semantic-status-warning-text", value: "#8B5A00", role: "Texto advertencia" },
  { name: "semantic/status/warning/icon", cssVar: "--semantic-status-warning-icon", value: "#8B5A00", role: "Icono advertencia" }
];

export const semanticStatusSuccess: ColorTokenItem[] = [
  { name: "semantic/status/success/bg", cssVar: "--semantic-status-success-bg", value: "#E8F8EF", role: "Superficie exito" },
  { name: "semantic/status/success/text", cssVar: "--semantic-status-success-text", value: "#0F5132", role: "Texto exito" },
  { name: "semantic/status/success/icon", cssVar: "--semantic-status-success-icon", value: "#0F5132", role: "Icono exito" }
];

export const semanticStatusDanger: ColorTokenItem[] = [
  { name: "semantic/status/danger/bg", cssVar: "--semantic-status-danger-bg", value: "#FCECEF", role: "Superficie peligro" },
  { name: "semantic/status/danger/text", cssVar: "--semantic-status-danger-text", value: "#450408", role: "Texto peligro" },
  { name: "semantic/status/danger/icon", cssVar: "--semantic-status-danger-icon", value: "#450408", role: "Icono peligro" }
];

export const semanticStatusPromo: ColorTokenItem[] = [
  { name: "semantic/status/promo/bg", cssVar: "--semantic-status-promo-bg", value: "#E8F6EE", role: "Superficie promo en banners" },
  { name: "semantic/status/promo/text", cssVar: "--semantic-status-promo-text", value: "#005840", role: "Texto promo" },
  { name: "semantic/status/promo/title", cssVar: "--semantic-status-promo-title", value: "#005840", role: "Titulo promo" },
  { name: "semantic/status/promo/icon", cssVar: "--semantic-status-promo-icon", value: "#005840", role: "Icono promo" },
  { name: "semantic/status/promo/link", cssVar: "--semantic-status-promo-link", value: "#005840", role: "Enlace promo" }
];

/** Solo tokens `.../icon` de estado (mapean a `Icon` tone info|warning|success|danger|promo). */
export const semanticStatusIconOnlyTokens: ColorTokenItem[] = [
  ...semanticStatusInfo.filter((t) => t.name.endsWith("/icon")),
  ...semanticStatusWarning.filter((t) => t.name.endsWith("/icon")),
  ...semanticStatusSuccess.filter((t) => t.name.endsWith("/icon")),
  ...semanticStatusDanger.filter((t) => t.name.endsWith("/icon")),
  ...semanticStatusPromo.filter((t) => t.name.endsWith("/icon"))
];

/** Component / Banner — por intencion */
export const componentBannerInfo: ColorTokenItem[] = [
  { name: "component/banner/info/bg", cssVar: "--component-banner-info-bg", value: "#E8F4FD", role: "Fondo banner informacion" },
  { name: "component/banner/info/text", cssVar: "--component-banner-info-text", value: "#1565C0", role: "Texto banner info" },
  { name: "component/banner/info/icon", cssVar: "--component-banner-info-icon", value: "#1565C0", role: "Icono banner info" }
];

export const componentBannerWarning: ColorTokenItem[] = [
  { name: "component/banner/warning/bg", cssVar: "--component-banner-warning-bg", value: "#FFF8E6", role: "Fondo banner advertencia" },
  { name: "component/banner/warning/text", cssVar: "--component-banner-warning-text", value: "#8B5A00", role: "Texto banner advertencia" },
  { name: "component/banner/warning/icon", cssVar: "--component-banner-warning-icon", value: "#8B5A00", role: "Icono banner advertencia" }
];

export const componentBannerPromo: ColorTokenItem[] = [
  { name: "component/banner/promo/bg", cssVar: "--component-banner-promo-bg", value: "#E8F6EE", role: "Fondo banner promo" },
  { name: "component/banner/promo/text", cssVar: "--component-banner-promo-text", value: "#005840", role: "Texto banner promo" },
  { name: "component/banner/promo/title", cssVar: "--component-banner-promo-title", value: "#005840", role: "Titulo banner promo" },
  { name: "component/banner/promo/icon", cssVar: "--component-banner-promo-icon", value: "#005840", role: "Icono banner promo" },
  { name: "component/banner/promo/link", cssVar: "--component-banner-promo-link", value: "#005840", role: "Enlace banner promo" }
];

export const componentBannerDanger: ColorTokenItem[] = [
  { name: "component/banner/danger/bg", cssVar: "--component-banner-danger-bg", value: "#FCECEF", role: "Fondo banner peligro" },
  { name: "component/banner/danger/text", cssVar: "--component-banner-danger-text", value: "#450408", role: "Texto banner peligro" },
  { name: "component/banner/danger/icon", cssVar: "--component-banner-danger-icon", value: "#450408", role: "Icono banner peligro" }
];

/** Component / Button */
export const componentButtonVariants: ColorTokenItem[] = [
  { name: "component/button/primary/bg", cssVar: "--component-button-primary-bg", value: "#FFB3D2", role: "Primario fondo" },
  { name: "component/button/primary/text", cssVar: "--component-button-primary-text", value: "#1E1F1F", role: "Primario texto" },
  { name: "component/button/secondary/bg", cssVar: "--component-button-secondary-bg", value: "transparent", role: "Secundario fondo" },
  { name: "component/button/secondary/text", cssVar: "--component-button-secondary-text", value: "#1E1F1F", role: "Secundario texto" },
  { name: "component/button/secondary/border", cssVar: "--component-button-secondary-border", value: "#FFB3D2", role: "Secundario borde" },
  { name: "component/button/tertiary/bg", cssVar: "--component-button-tertiary-bg", value: "#4E080C", role: "Terciario fondo" },
  { name: "component/button/tertiary/text", cssVar: "--component-button-tertiary-text", value: "#FFFFFF", role: "Terciario texto" },
  { name: "component/button/tertiary/border", cssVar: "--component-button-tertiary-border", value: "#4E080C", role: "Terciario borde" },
  { name: "component/button/link/text", cssVar: "--component-button-link-text", value: "#4E080C", role: "Link button texto" },
  { name: "component/button/disabled/bg", cssVar: "--component-button-disabled-bg", value: "#EAEBEB", role: "Disabled fondo" },
  { name: "component/button/disabled/text", cssVar: "--component-button-disabled-text", value: "#6C7074", role: "Disabled texto" },
  { name: "component/button/focus/ring", cssVar: "--component-button-focus-ring", value: "#1A73E8", role: "Anillo foco boton" }
];

/** Component / IconButton */
export const componentIconButtonVariants: ColorTokenItem[] = [
  { name: "component/iconButton/primary/bg", cssVar: "--component-icon-button-primary-bg", value: "#FFB3D2", role: "IconButton primario fondo" },
  { name: "component/iconButton/primary/border", cssVar: "--component-icon-button-primary-border", value: "#FFB3D2", role: "IconButton primario borde" },
  { name: "component/iconButton/primary/icon", cssVar: "--component-icon-button-primary-icon", value: "#1E1F1F", role: "IconButton primario icono" },
  { name: "component/iconButton/secondary/bg", cssVar: "--component-icon-button-secondary-bg", value: "transparent", role: "IconButton secundario fondo" },
  { name: "component/iconButton/secondary/border", cssVar: "--component-icon-button-secondary-border", value: "#FFB3D2", role: "IconButton secundario borde" },
  { name: "component/iconButton/secondary/icon", cssVar: "--component-icon-button-secondary-icon", value: "#1E1F1F", role: "IconButton secundario icono" },
  { name: "component/iconButton/tertiary/bg", cssVar: "--component-icon-button-tertiary-bg", value: "#4E080C", role: "IconButton terciario fondo" },
  { name: "component/iconButton/tertiary/border", cssVar: "--component-icon-button-tertiary-border", value: "#4E080C", role: "IconButton terciario borde" },
  { name: "component/iconButton/tertiary/icon", cssVar: "--component-icon-button-tertiary-icon", value: "#FFFFFF", role: "IconButton terciario icono" },
  { name: "component/iconButton/badge/bg", cssVar: "--component-icon-button-badge-bg", value: "#FFB3D2", role: "Badge notificaciones fondo" },
  { name: "component/iconButton/badge/border", cssVar: "--component-icon-button-badge-border", value: "#FFFFFF", role: "Badge borde (contraste con superficie)" },
  { name: "component/iconButton/focus/ring", cssVar: "--component-icon-button-focus-ring", value: "#1A73E8", role: "Anillo foco IconButton" }
];

/** Component / SegmentedControl */
export const componentSegmentedControl: ColorTokenItem[] = [
  { name: "component/segmentedControl/bg", cssVar: "--component-segmented-control-bg", value: "#FFFFFF", role: "Contenedor del control" },
  { name: "component/segmentedControl/border", cssVar: "--component-segmented-control-border", value: "#EAEBEB", role: "Borde del grupo" },
  { name: "component/segmentedControl/option/text", cssVar: "--component-segmented-control-option-text", value: "#6C7074", role: "Opcion inactiva" },
  { name: "component/segmentedControl/option/active/bg", cssVar: "--component-segmented-control-option-active-bg", value: "#4E080C", role: "Opcion activa fondo" },
  { name: "component/segmentedControl/option/active/text", cssVar: "--component-segmented-control-option-active-text", value: "#FFFFFF", role: "Opcion activa texto" },
  { name: "component/segmentedControl/focus/ring", cssVar: "--component-segmented-control-focus-ring", value: "#1A73E8", role: "Anillo foco opcion" }
];

/** Component / Avatar (color) */
export const componentAvatar: ColorTokenItem[] = [
  { name: "component/avatar/user/bg", cssVar: "--component-avatar-user-bg", value: "#FAFAFA", role: "Fallback avatar sin foto" },
  { name: "component/avatar/user/text", cssVar: "--component-avatar-user-text", value: "#6C7074", role: "Iniciales avatar" },
  { name: "component/avatar/user/border", cssVar: "--component-avatar-user-border", value: "#EAEBEB", role: "Borde avatar" },
  { name: "component/avatar/focus/ring", cssVar: "--component-avatar-focus-ring", value: "#1A73E8", role: "Anillo foco avatar" }
];
