import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fragment, useMemo, useState } from "react";
import type { CardProps } from "../../components/Card";
import type { ContentArticle, ContentFilterOption } from "../../components/ContentModule";
import tractivePromoUrl from "./assets/tractive-promo.jpg";
import { Home, type HomeProps } from "./Home";

const newsArticles: ContentArticle[] = [
  {
    id: "cnt_home_001",
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
    id: "cnt_home_002",
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
    id: "cnt_home_003",
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

const newsFilterOptions: ContentFilterOption[] = [
  { label: "Todos", value: "all" },
  { label: "Salud", value: "salud" },
  { label: "Prevención", value: "prevencion" },
  { label: "Alimentación", value: "alimentacion" }
];

function HomeWithNews(props: HomeProps) {
  const [filter, setFilter] = useState("all");
  const newsFiltered = useMemo(() => {
    if (filter === "all") return newsArticles;
    return newsArticles.filter((a) => a.categoryId === filter);
  }, [filter]);

  return (
    <Home
      {...props}
      contentModule={{
        allFilterValue: "all",
        articles: newsFiltered,
        filterOptions: newsFilterOptions,
        filterValue: filter,
        onFilterChange: setFilter,
        title: (
          <Fragment>
            <span className="musky-home__section-title-prefix">Últimas </span>
            noticias
          </Fragment>
        )
      }}
    />
  );
}

const promoCarouselItems: CardProps[] = [
  {
    chipLabel: "Nuevo",
    chipPriority: "low",
    description: "Sigue a Perrín en tiempo real y cuida su salud\ny actividad diaria.",
    id: "tractive-home",
    imageAlt: "Perrín con collar y localizador Tractive",
    imageUrl: tractivePromoUrl,
    title: "Obtén tu Tractive gratis",
    type: "navigation"
  },
  {
    chipLabel: "Oferta",
    chipPriority: "low",
    description: "Invita amigos y suma saldo para cuidados.",
    id: "referral-home",
    imageAlt: "Personas paseando con un perro",
    imageUrl:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=640&q=80",
    title: "Gana 25€ por amigo",
    type: "navigation"
  },
  {
    chipLabel: "Guía",
    chipPriority: "low",
    description: "Consejos concretos para el día a día.",
    id: "care-home",
    imageAlt: "Gato recibiendo cuidados",
    imageUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=640&q=80",
    title: "Cuidado de mascotas",
    type: "navigation"
  }
];

const meta = {
  title: "Pages/Home",
  component: Home,
  args: {
    promoCarousel: {
      actionLabel: "ver todas",
      items: promoCarouselItems,
      onActionClick: () => undefined,
      title: (
        <Fragment>
          <span className="musky-home__section-title-prefix">Tus </span>
          promociones
        </Fragment>
      )
    }
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Página de composición para Home: Header, Banner de resumen, Action List de tareas, reembolsos, carrusel de promos, card de recompensas y módulo de contenido (noticias) al final."
      }
    }
  }
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <HomeWithNews {...args} />,
  args: {
    banner: {
      "children": "Tienes 1 acción urgente y 1 pendiente",
      "icon": "🚧",
      "title": "Acciones Requeridas",
      "variant": "danger"
    },
    header: {
      notificationsCount: 2,
      user: { name: "Eduardo" }
    }
  }
};

export const EmptyUserData: Story = {
  args: {
    actions: [
      {
        description: "Programa la cita con antelación",
        icon: "injection",
        id: "vaccine-info",
        priority: "normal",
        title: "Vacunar a Perrín (6 meses)",
        type: "informational"
      }
    ],
    banner: {
      children: "Tienes próximas acciones",
      title: "Recordatorios",
      variant: "info"
    },
    header: {
      notificationsCount: 0,
      showRewards: true,
      user: null
    }
  }
};
