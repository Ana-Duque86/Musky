import type { HTMLAttributes, ReactNode } from "react";
import "./Banner.css";

export type BannerVariant = "info" | "warning" | "promo" | "danger" | "success";

export interface BannerProps extends HTMLAttributes<HTMLElement> {
  variant?: BannerVariant;
  /** Leading visual: emoji, texto corto o nodo. Si se omite, se usa el icono por defecto de la variante. */
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
  inlineLink?: ReactNode;
  action?: ReactNode;
  dismiss?: ReactNode;
}

const defaultIcons: Record<BannerVariant, string> = {
  info: "i",
  warning: "!",
  promo: "%",
  danger: "!",
  success: "✓"
};

export function Banner({
  action,
  children,
  className,
  dismiss,
  icon,
  inlineLink,
  title,
  variant = "info",
  ...props
}: BannerProps) {
  return (
    <section
      {...props}
      className={["musky-banner", `musky-banner--${variant}`, className].filter(Boolean).join(" ")}
    >
      <span aria-hidden="true" className="musky-banner__icon">
        {icon ?? defaultIcons[variant]}
      </span>
      <div className="musky-banner__content">
        {title ? <strong className="musky-banner__title">{title}</strong> : null}
        <div className="musky-banner__body">
          {children}
          {inlineLink ? <span className="musky-banner__inline-link">{inlineLink}</span> : null}
        </div>
      </div>
      {action || dismiss ? <div className="musky-banner__actions">{action ?? dismiss}</div> : null}
    </section>
  );
}
