import type { HTMLAttributes } from "react";
import "./Chip.css";

export type ChipPriority = "urgent" | "high" | "normal" | "low" | "blocked";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  priority?: ChipPriority;
  children?: string;
}

const defaultLabels: Record<ChipPriority, string> = {
  urgent: "Requerido",
  high: "Pendiente",
  normal: "Próximo",
  low: "Info",
  blocked: "Bloqueado"
};

export function Chip({ children, className, priority = "normal", ...props }: ChipProps) {
  return (
    <span
      {...props}
      className={["musky-chip", `musky-chip--${priority}`, className].filter(Boolean).join(" ")}
    >
      {children ?? defaultLabels[priority]}
    </span>
  );
}
