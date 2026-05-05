import type { SVGProps } from "react";
import {
  CareArtwork,
  InjectionArtwork,
  MedicalDocumentArtwork,
  MicrochipArtwork,
  NotificationsArtwork,
  NotificationsBadgeArtwork,
  PresentArtwork
} from "./icon-duotone-artwork";
import "./Icon.css";

export type IconName =
  | "microchip"
  | "medicalDocument"
  | "injection"
  | "care"
  | "notifications"
  | "notificationsBadge"
  | "present";

/** Figma `layout/icon/size/{sm,md,lg}` → 24, 38, 48. */
export type IconSize = "sm" | "md" | "lg";

/** Tintes de color (duotono usa `--semantic-icon-duo-*` definidos por tono). */
export type IconTone =
  | "primary"
  | "secondary"
  | "muted"
  | "inverse"
  | "brand"
  | "brandPink"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "promo";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
  tone?: IconTone;
  decorative?: boolean;
  title?: string;
}

export function Icon({
  className,
  decorative = true,
  name,
  size = "md",
  title,
  tone = "primary",
  ...props
}: IconProps) {
  const titleId = title ? `musky-icon-${name}` : undefined;

  return (
    <svg
      {...props}
      aria-hidden={decorative ? true : undefined}
      aria-labelledby={!decorative && titleId ? titleId : undefined}
      className={["musky-icon", `musky-icon--${size}`, `musky-icon--tone-${tone}`, className].filter(Boolean).join(" ")}
      focusable="false"
      role={decorative ? "presentation" : "img"}
      viewBox="0 0 38 38"
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {renderIcon(name)}
    </svg>
  );
}

function renderIcon(name: IconName) {
  switch (name) {
    case "microchip":
      return <MicrochipArtwork />;
    case "medicalDocument":
      return <MedicalDocumentArtwork />;
    case "injection":
      return <InjectionArtwork />;
    case "care":
      return <CareArtwork />;
    case "notifications":
      return <NotificationsArtwork />;
    case "notificationsBadge":
      return <NotificationsBadgeArtwork />;
    case "present":
      return <PresentArtwork />;
  }
}
