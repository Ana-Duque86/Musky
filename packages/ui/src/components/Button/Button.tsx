import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  children,
  className,
  disabled = false,
  fullWidth = false,
  leadingIcon,
  loading = false,
  size = "lg",
  trailingIcon,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = [
    "musky-button",
    `musky-button--${variant}`,
    `musky-button--${size}`,
    fullWidth ? "musky-button--full-width" : "",
    loading ? "musky-button--loading" : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={classes}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? <span aria-hidden="true" className="musky-button__spinner" /> : null}
      {!loading && leadingIcon ? (
        <span aria-hidden="true" className="musky-button__icon">
          {leadingIcon}
        </span>
      ) : null}
      <span className="musky-button__label">{children}</span>
      {!loading && trailingIcon ? (
        <span aria-hidden="true" className="musky-button__icon">
          {trailingIcon}
        </span>
      ) : null}
    </button>
  );
}
