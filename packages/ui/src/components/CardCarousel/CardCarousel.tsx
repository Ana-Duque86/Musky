import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "../Button";
import { Card, type CardProps } from "../Card";
import "./CardCarousel.css";

export type CardCarouselScrollType = "snap" | "free";
export type CardCarouselSize = "sm" | "md" | "lg";

export interface CardCarouselProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  items: CardProps[];
  title?: ReactNode;
  description?: string;
  scrollType?: CardCarouselScrollType;
  cardSize?: CardCarouselSize;
  peek?: boolean;
  actionLabel?: string;
  showActionThreshold?: number;
  onActionClick?: () => void;
}

export function CardCarousel({
  actionLabel,
  cardSize = "md",
  className,
  description,
  items,
  onActionClick,
  peek = true,
  scrollType = "snap",
  showActionThreshold = 2,
  title,
  ...props
}: CardCarouselProps) {
  if (items.length === 0) return null;

  if (items.length === 1) {
    return (
      <section
        {...props}
        className={["musky-card-carousel", "musky-card-carousel--single", className]
          .filter(Boolean)
          .join(" ")}
      >
        {title || description ? (
          <CardCarouselHeader
            description={description}
            showAction={false}
            title={title}
          />
        ) : null}
        <Card {...items[0]} elevation={items[0].elevation ?? "none"} />
      </section>
    );
  }

  const showAction = Boolean(actionLabel && items.length > showActionThreshold);

  return (
    <section
      {...props}
      className={[
        "musky-card-carousel",
        `musky-card-carousel--${scrollType}`,
        `musky-card-carousel--${cardSize}`,
        peek ? "musky-card-carousel--peek" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title || description || showAction ? (
        <CardCarouselHeader
          actionLabel={actionLabel}
          description={description}
          onActionClick={onActionClick}
          showAction={showAction}
          title={title}
        />
      ) : null}
      <div
        aria-label={typeof title === "string" ? title : "Carrusel de cards"}
        className="musky-card-carousel__track"
      >
        {items.map((item) => (
          <div className="musky-card-carousel__item" key={item.id ?? item.title}>
            <Card {...item} elevation={item.elevation ?? "none"} />
          </div>
        ))}
      </div>
    </section>
  );
}

interface CardCarouselHeaderProps {
  title?: ReactNode;
  description?: string;
  actionLabel?: string;
  showAction: boolean;
  onActionClick?: () => void;
}

function CardCarouselHeader({
  actionLabel,
  description,
  onActionClick,
  showAction,
  title
}: CardCarouselHeaderProps) {
  return (
    <div className="musky-card-carousel__header">
      <div className="musky-card-carousel__heading">
        {title ? <h2 className="musky-card-carousel__title">{title}</h2> : null}
        {description ? (
          <p className="musky-card-carousel__description">{description}</p>
        ) : null}
      </div>
      {showAction ? (
        <Button
          className="musky-card-carousel__header-action"
          onClick={onActionClick}
          size="sm"
          variant="secondary"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
