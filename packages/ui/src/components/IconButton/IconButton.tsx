import type { ReactNode } from "react";
import "./IconButton.css";

export type IconButtonVariant = "primary" | "secondary" | "tertiary";

export interface IconButtonProps {
  label: string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  badge?: boolean;
  onClick?: () => void;
}

export function IconButton({
  label,
  icon,
  variant = "secondary",
  badge = false,
  onClick
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={`musky-icon-button musky-icon-button--${variant}`}
      onClick={onClick}
      type="button"
    >
      <span aria-hidden="true" className="musky-icon-button__icon">
        {icon}
      </span>
      {badge ? <span className="musky-icon-button__badge" /> : null}
    </button>
  );
}
