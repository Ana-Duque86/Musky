import type { HTMLAttributes, ReactNode } from "react";
import { Button, type ButtonVariant } from "../Button";
import { Chip, type ChipPriority } from "../Chip";
import { Icon, type IconName } from "../Icon";
import "./Card.css";

export type CardType = "navigation" | "action" | "info";
export type CardVisualType = "image" | "icon" | "none";
export type CardOrientation = "vertical" | "horizontal";
export type CardDensity = "compact" | "default";
export type CardElevation = "none" | "low" | "high";
export type CardCtaType = "none" | "link" | "buttons";
export type CardState = "default" | "disabled" | "loading";
/** Chrome around the card: default panel, or editorial (no border/fill, image fully rounded). */
export type CardSurface = "default" | "editorial";
/** Editorial category accent for content cards (not Chip / Priority). */
export type CardContentCategoryTone = "health" | "prevention" | "nutrition" | "default";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  type?: CardType;
  visualType?: CardVisualType;
  imageUrl?: string;
  imageAlt?: string;
  icon?: IconName;
  chipPriority?: ChipPriority;
  chipLabel?: string;
  /** Uppercase or short category line above the title (content/editorial). */
  contentCategoryLabel?: string;
  contentCategoryTone?: CardContentCategoryTone;
  title: string;
  description?: string;
  metadata?: string;
  /** Optional block below metadata/CTA (e.g. ActionList). */
  children?: ReactNode;
  /** Link CTA label when `ctaType` is `link`. */
  ctaLabel?: string;
  ctaType?: CardCtaType;
  /** Primary action label when `ctaType` is `buttons` (requires `ctaSecondaryLabel`). */
  ctaPrimaryLabel?: string;
  /** Secondary action label when `ctaType` is `buttons` (requires `ctaPrimaryLabel`). */
  ctaSecondaryLabel?: string;
  ctaPrimaryVariant?: ButtonVariant;
  ctaSecondaryVariant?: ButtonVariant;
  href?: string;
  orientation?: CardOrientation;
  density?: CardDensity;
  elevation?: CardElevation;
  state?: CardState;
  /** Use `editorial` for discovery rails: transparent surface, no border, image with radius on all corners. */
  surface?: CardSurface;
  onCardClick?: () => void;
  onCtaClick?: () => void;
  onCtaPrimaryClick?: () => void;
  onCtaSecondaryClick?: () => void;
}

export function Card({
  chipLabel,
  children,
  chipPriority,
  className,
  contentCategoryLabel,
  contentCategoryTone = "default",
  ctaLabel,
  ctaPrimaryLabel,
  ctaPrimaryVariant = "primary",
  ctaSecondaryLabel,
  ctaSecondaryVariant = "secondary",
  ctaType = "none",
  density = "default",
  description,
  elevation = "low",
  href,
  icon,
  imageAlt = "",
  imageUrl,
  metadata,
  onCardClick,
  onCtaClick,
  onCtaPrimaryClick,
  onCtaSecondaryClick,
  orientation = "vertical",
  state = "default",
  surface = "default",
  title,
  type = "navigation",
  visualType,
  ...props
}: CardProps) {
  const resolvedVisualType = visualType ?? (imageUrl ? "image" : icon ? "icon" : "none");
  const hasLinkCta = ctaType === "link" && Boolean(ctaLabel);
  const hasButtonPair =
    ctaType === "buttons" && Boolean(ctaPrimaryLabel) && Boolean(ctaSecondaryLabel);
  const hasCta = hasLinkCta || hasButtonPair;
  const isDisabled = state === "disabled";
  const isLoading = state === "loading";
  const blocksWholeCardAnchor = hasButtonPair || (hasLinkCta && !href);
  const isWholeCardAnchor =
    type === "navigation" &&
    Boolean(href) &&
    !blocksWholeCardAnchor &&
    !isDisabled &&
    !isLoading;
  const hasCardTarget = Boolean(href || onCardClick);
  const isWholeCardButton =
    type === "navigation" &&
    !hasCta &&
    !isDisabled &&
    !isLoading &&
    Boolean(onCardClick) &&
    !href;
  const Tag = isWholeCardAnchor ? "a" : isWholeCardButton ? "button" : "article";
  const decorativeLinkCta = Boolean(isWholeCardAnchor && hasLinkCta && ctaLabel);
  const anchorAriaLabel =
    decorativeLinkCta && ctaLabel ? `${title}. ${ctaLabel}` : undefined;
  const interactiveProps =
    Tag === "a"
      ? { href, ...(anchorAriaLabel ? { "aria-label": anchorAriaLabel } : {}) }
      : Tag === "button"
        ? { disabled: isDisabled || isLoading, onClick: onCardClick, type: "button" as const }
        : {};

  return (
    <Tag
      {...props}
      {...interactiveProps}
      aria-busy={isLoading || undefined}
      className={[
        "musky-card",
        `musky-card--${type}`,
        `musky-card--${orientation}`,
        `musky-card--${density}`,
        `musky-card--elevation-${elevation}`,
        `musky-card--surface-${surface}`,
        `musky-card--state-${state}`,
        Tag === "a" || Tag === "button" ? "musky-card--clickable" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {resolvedVisualType !== "none" ? (
        <span className={`musky-card__visual musky-card__visual--${resolvedVisualType}`}>
          {resolvedVisualType === "image" && imageUrl ? (
            <img alt={imageAlt} className="musky-card__image" src={imageUrl} />
          ) : null}
          {resolvedVisualType === "icon" && icon ? <Icon name={icon} size="lg" /> : null}
        </span>
      ) : null}

      <span className="musky-card__body">
        {contentCategoryLabel ? (
          <span
            className={[
              "musky-card__content-category",
              `musky-card__content-category--${contentCategoryTone}`
            ].join(" ")}
          >
            {contentCategoryLabel}
          </span>
        ) : null}
        {chipPriority ? <Chip priority={chipPriority}>{chipLabel}</Chip> : null}
        <span className="musky-card__title-row">
          <span className="musky-card__title">{title}</span>
        </span>
        {description ? <span className="musky-card__description">{description}</span> : null}
        {metadata || hasCta ? (
          <span
            className={[
              "musky-card__footer",
              metadata && hasLinkCta && surface !== "editorial"
                ? "musky-card__footer--metadata-link"
                : ""
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {metadata ? <span className="musky-card__metadata">{metadata}</span> : null}
            {hasButtonPair ? (
              <span className="musky-card__actions">
                <Button
                  disabled={isDisabled || isLoading}
                  loading={isLoading}
                  onClick={onCtaPrimaryClick}
                  size="sm"
                  variant={ctaPrimaryVariant}
                >
                  {ctaPrimaryLabel}
                </Button>
                <Button
                  disabled={isDisabled || isLoading}
                  onClick={onCtaSecondaryClick}
                  size="sm"
                  variant={ctaSecondaryVariant}
                >
                  {ctaSecondaryLabel}
                </Button>
              </span>
            ) : null}
            {hasLinkCta ? (
              decorativeLinkCta ? (
                <span aria-hidden="true" className="musky-card__link musky-card__link--decorative">
                  {ctaLabel}
                </span>
              ) : (
                <button
                  className="musky-card__link"
                  disabled={isDisabled || isLoading}
                  onClick={onCtaClick}
                  type="button"
                >
                  {ctaLabel}
                </button>
              )
            ) : null}
          </span>
        ) : null}
        {children ? <div className="musky-card__slot">{children}</div> : null}
      </span>
    </Tag>
  );
}
