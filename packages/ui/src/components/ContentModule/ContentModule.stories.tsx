import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { ContentModule, type ContentArticle, type ContentFilterOption } from "./ContentModule";

const meta = {
  title: "Components/Content/ContentModule",
  component: ContentModule,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Módulo de descubrimiento: título opcional, chips de filtro (radiogroup en scroll horizontal) y carrusel de artículos. Las etiquetas de categoría en la card solo se muestran cuando el filtro activo es «todos» (`allFilterValue`)."
      }
    }
  }
} satisfies Meta<typeof ContentModule>;

export default meta;
type Story = StoryObj<typeof ContentModule>;

const filterOptions: ContentFilterOption[] = [
  { label: "Todos", value: "all" },
  { label: "Salud", value: "salud" },
  { label: "Prevención", value: "prevencion" },
  { label: "Alimentación", value: "alimentacion" }
];

const library: ContentArticle[] = [
  {
    id: "cnt_001",
    title: "Cómo detectar problemas estomacales a tiempo",
    description:
      "Conoce los primeros síntomas y cuándo pedir cita con tu veterinario para evitar complicaciones.",
    categoryId: "salud",
    categoryLabel: "SALUD",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    imageAlt: "Perro mirando a cámara",
    href: "#/articulo/estomago",
    readDuration: "3 min lectura"
  },
  {
    id: "cnt_002",
    title: "Calendario de vacunas esenciales en cachorros",
    description: "Guía rápida por edad para no saltarte ninguna dosis importante.",
    categoryId: "prevencion",
    categoryLabel: "PREVENCIÓN",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
    imageAlt: "Cachorro",
    href: "#/articulo/vacunas",
    readDuration: "5 min lectura"
  },
  {
    id: "cnt_003",
    title: "Transición de pienso sin alterar el tránsito",
    description: "Pasos sencillos para cambiar la dieta sin indigestiones.",
    categoryId: "alimentacion",
    categoryLabel: "ALIMENTACIÓN",
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    imageAlt: "Comida para mascotas",
    href: "#/articulo/dieta",
    readDuration: "4 min lectura"
  }
];

function FilteredContentModule() {
  const [filter, setFilter] = useState("all");
  const articles = useMemo(() => {
    if (filter === "all") return library;
    return library.filter((a) => a.categoryId === filter);
  }, [filter]);

  return (
    <div
      style={{
        maxWidth: 390,
        padding: "var(--space-2) var(--layout-screen-padding-x)",
        width: "100%"
      }}
    >
      <ContentModule
        allFilterValue="all"
        articles={articles}
        filterOptions={filterOptions}
        filterValue={filter}
        onFilterChange={setFilter}
        title="Últimas noticias"
      />
    </div>
  );
}

export const LatestNews: Story = {
  render: () => <FilteredContentModule />
};

export const SinFiltros: Story = {
  args: {
    title: "Tips para ti",
    articles: library.slice(0, 2)
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: 390,
          padding: "var(--space-2) var(--layout-screen-padding-x)",
          width: "100%"
        }}
      >
        <Story />
      </div>
    )
  ]
};

export const VacioFiltrado: Story = {
  render: () => (
    <div
      style={{
        maxWidth: 390,
        padding: "var(--space-2) var(--layout-screen-padding-x)",
        width: "100%"
      }}
    >
      <ContentModule
        allFilterValue="all"
        articles={[]}
        emptyStateLabel="No hay artículos en esta categoría."
        filterOptions={filterOptions}
        filterValue="alimentacion"
        onFilterChange={() => undefined}
        title="Últimas noticias"
      />
    </div>
  )
};
