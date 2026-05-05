import type { HTMLAttributes, ReactNode } from "react";
import { useCallback, useId, useMemo, useState } from "react";
import type { CardCarouselScrollType, CardCarouselSize } from "../CardCarousel";
import { CardCarousel } from "../CardCarousel";
import type { CardContentCategoryTone, CardProps } from "../Card";
import "./ContentModule.css";

export interface ContentArticle {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt?: string;
  href: string;
  /** Stable category key for filtering and tone mapping (e.g. salud). */
  categoryId: string;
  /** Visible category line, usually uppercase (e.g. SALUD). */
  categoryLabel: string;
  readDuration?: string;
}

export interface ContentFilterOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ContentModuleProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Section heading (e.g. Últimas noticias). */
  title?: ReactNode;
  /** Horizontal filter chips; hidden when empty. */
  filterOptions?: ContentFilterOption[];
  /** Value for the “all” chip; category labels on cards show only when selection equals this. */
  allFilterValue?: string;
  /** Controlled filter selection (required when `filterOptions` has items). */
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  articles: ContentArticle[];
  /** CTA copy on each card (default: Leer artículo). */
  linkLabel?: string;
  /** Shown when `articles` is empty after filtering. */
  emptyStateLabel?: string;
  /** Accessible name for the filter radiogroup. */
  filterGroupLabel?: string;
  loading?: boolean;
  scrollType?: CardCarouselScrollType;
  cardSize?: CardCarouselSize;
  peek?: boolean;
}

export function contentCategoryToneFromId(categoryId: string): CardContentCategoryTone {
  switch (categoryId) {
    case "salud":
      return "health";
    case "prevencion":
      return "prevention";
    case "alimentacion":
      return "nutrition";
    default:
      return "default";
  }
}

function articleToCardProps(
  article: ContentArticle,
  showCategory: boolean,
  linkLabel: string
): CardProps {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    imageUrl: article.imageUrl,
    imageAlt: article.imageAlt ?? "",
    href: article.href,
    type: "navigation",
    ctaType: "link",
    ctaLabel: linkLabel,
    metadata: article.readDuration,
    elevation: "none",
    surface: "editorial",
    contentCategoryLabel: showCategory ? article.categoryLabel : undefined,
    contentCategoryTone: showCategory ? contentCategoryToneFromId(article.categoryId) : undefined
  };
}

export function ContentModule({
  allFilterValue = "all",
  articles,
  className,
  emptyStateLabel = "No hay contenido en esta categoría.",
  filterGroupLabel = "Filtrar contenido",
  filterOptions,
  filterValue: filterValueControlled,
  linkLabel = "Leer artículo",
  loading = false,
  onFilterChange,
  peek = true,
  scrollType = "snap",
  cardSize = "md",
  title,
  ...props
}: ContentModuleProps) {
  const reactId = useId();
  const filterGroupId = `${reactId}-filters`;

  const [filterValueUncontrolled, setFilterValueUncontrolled] = useState(allFilterValue);
  const hasFilters = Boolean(filterOptions && filterOptions.length > 0);
  const filterValue =
    filterValueControlled ?? (hasFilters ? filterValueUncontrolled : allFilterValue);

  const setFilter = useCallback(
    (next: string) => {
      onFilterChange?.(next);
      if (filterValueControlled === undefined) {
        setFilterValueUncontrolled(next);
      }
    },
    [filterValueControlled, onFilterChange]
  );

  const showCategoryOnCards = filterValue === allFilterValue;

  const cardItems = useMemo(
    () => articles.map((a) => articleToCardProps(a, showCategoryOnCards, linkLabel)),
    [articles, linkLabel, showCategoryOnCards]
  );

  return (
    <section
      {...props}
      aria-busy={loading || undefined}
      aria-labelledby={title ? `${reactId}-heading` : undefined}
      className={["musky-content-module", loading ? "musky-content-module--loading" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {title ? (
        <h2 className="musky-content-module__title" id={`${reactId}-heading`}>
          {title}
        </h2>
      ) : null}

      {hasFilters && filterOptions ? (
        <div className="musky-content-module__filter-scroll">
          <div
            aria-label={filterGroupLabel}
            className="musky-content-module__filter-group"
            id={filterGroupId}
            role="radiogroup"
          >
            {filterOptions.map((option, index) => {
              const active = option.value === filterValue;

              return (
                <button
                  aria-checked={active}
                  aria-posinset={index + 1}
                  aria-setsize={filterOptions.length}
                  className="musky-content-module__filter-chip"
                  data-active={active || undefined}
                  disabled={option.disabled}
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  role="radio"
                  type="button"
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {articles.length === 0 ? (
        <p className="musky-content-module__empty" role="status">
          {emptyStateLabel}
        </p>
      ) : (
        <CardCarousel
          cardSize={cardSize}
          className="musky-content-module__carousel"
          items={cardItems}
          peek={peek}
          scrollType={scrollType}
        />
      )}
    </section>
  );
}
