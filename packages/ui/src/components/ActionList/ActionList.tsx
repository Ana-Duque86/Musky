import type { HTMLAttributes } from "react";
import { Chip, type ChipPriority } from "../Chip";
import { Icon, type IconName, type IconSize, type IconTone } from "../Icon";
import "./ActionList.css";

export type ActionListItemType = "actionable" | "informational";
export type ActionListProgressStatus = "blocked" | "reviewing" | "processingPayment" | "paid";

export interface ActionListItem {
  id: string;
  title: string;
  description?: string;
  priority?: ChipPriority;
  progressStatus?: ActionListProgressStatus;
  type?: ActionListItemType;
  icon?: IconName;
  /** Override Figma `layout/icon/size/*` (list default sm = 24px). */
  iconSize?: IconSize;
  /** Override semantic icon tint (list default secondary). */
  iconTone?: IconTone;
  metadata?: string;
  target?: string;
}

export interface ActionListProps extends HTMLAttributes<HTMLDivElement> {
  items: ActionListItem[];
  grouping?: "grouped" | "flat";
  /** Default leading icon size when an item omits `iconSize` (falls back to sm = 24px). */
  defaultIconSize?: IconSize;
  /** Default duotone tint when an item omits `iconTone` (e.g. `brand` on Home). */
  defaultIconTone?: IconTone;
  onItemClick?: (item: ActionListItem) => void;
}

const priorityIcon: Record<ChipPriority, IconName> = {
  urgent: "microchip",
  high: "medicalDocument",
  normal: "injection",
  low: "notifications",
  blocked: "care"
};

const progressSteps: Array<{ status: ActionListProgressStatus; label: string }> = [
  { status: "blocked", label: "Bloqueado" },
  { status: "reviewing", label: "En revisión" },
  { status: "processingPayment", label: "Procesando pago" },
  { status: "paid", label: "Pagado" }
];

export function ActionList({
  className,
  defaultIconSize,
  defaultIconTone,
  grouping = "grouped",
  items,
  onItemClick,
  ...props
}: ActionListProps) {
  return (
    <div
      {...props}
      className={["musky-action-list", `musky-action-list--${grouping}`, className]
        .filter(Boolean)
        .join(" ")}
      role="list"
    >
      {items.map((item, index) => (
        <ActionListRow
          defaultIconSize={defaultIconSize}
          defaultIconTone={defaultIconTone}
          isLast={index === items.length - 1}
          item={item}
          key={item.id}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
}

interface ActionListRowProps {
  defaultIconSize?: IconSize;
  defaultIconTone?: IconTone;
  item: ActionListItem;
  isLast: boolean;
  onItemClick?: (item: ActionListItem) => void;
}

function ActionListRow({ defaultIconSize, defaultIconTone, isLast, item, onItemClick }: ActionListRowProps) {
  const type = item.type ?? "actionable";
  const priority = item.priority ?? "normal";
  const isActionable = type === "actionable";
  const hasProgress = Boolean(item.progressStatus);
  const resolvedIconSize = item.iconSize ?? defaultIconSize ?? "sm";
  const content = (
    <>
      <span
        aria-hidden="true"
        className={[
          "musky-action-list__leading",
          `musky-action-list__leading--${resolvedIconSize}`
        ].join(" ")}
      >
        <span className="musky-action-list__leading-inner">
          <Icon
            name={item.icon ?? priorityIcon[priority]}
            size={resolvedIconSize}
            tone={item.iconTone ?? defaultIconTone ?? "secondary"}
          />
        </span>
      </span>
      <span className="musky-action-list__content">
        <span className="musky-action-list__title-row">
          <span className="musky-action-list__title">{item.title}</span>
          {!hasProgress ? <Chip priority={priority} /> : null}
        </span>
        {item.description ? (
          <span className="musky-action-list__description">{item.description}</span>
        ) : null}
        {item.metadata ? <span className="musky-action-list__metadata">{item.metadata}</span> : null}
        {item.progressStatus ? <ActionListProgress status={item.progressStatus} /> : null}
      </span>
      {isActionable ? (
        <span aria-hidden="true" className="musky-action-list__chevron-slot">
          <span className="musky-action-list__chevron">›</span>
        </span>
      ) : null}
    </>
  );

  return (
    <div
      className={[
        "musky-action-list__item",
        `musky-action-list__item--${type}`,
        hasProgress ? "musky-action-list__item--progress" : "",
        !isLast ? "musky-action-list__item--divided" : ""
      ]
        .filter(Boolean)
        .join(" ")}
      role="listitem"
    >
      {isActionable ? (
        <button
          className="musky-action-list__row"
          onClick={() => onItemClick?.(item)}
          type="button"
        >
          {content}
        </button>
      ) : (
        <div className="musky-action-list__row">{content}</div>
      )}
    </div>
  );
}

function ActionListProgress({ status }: { status: ActionListProgressStatus }) {
  const activeIndex = progressSteps.findIndex((step) => step.status === status);
  const label = progressSteps[activeIndex]?.label ?? progressSteps[0].label;

  return (
    <span
      aria-label={`Estado del reembolso: ${label}`}
      className={`musky-action-list__progress musky-action-list__progress--${status}`}
      role="img"
    >
      {progressSteps.map((step, index) => (
        <span
          aria-hidden="true"
          className={[
            "musky-action-list__progress-segment",
            index <= activeIndex ? "musky-action-list__progress-segment--active" : ""
          ]
            .filter(Boolean)
            .join(" ")}
          key={step.status}
        />
      ))}
    </span>
  );
}
