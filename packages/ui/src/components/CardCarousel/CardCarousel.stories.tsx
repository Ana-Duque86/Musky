import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import type { CardProps } from "../Card";
import { ActionList, type ActionListItem } from "../ActionList";
import { CardCarousel } from "./CardCarousel";

const promoItems: CardProps[] = [
  {
    description: "Localiza y cuida a Perrín",
    id: "tractive",
    imageAlt: "Perro con localizador Tractive en el collar",
    imageUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=640&q=80",
    metadata: "Promo",
    title: "Obtén tu Tractive gratis",
    type: "navigation"
  },
  {
    chipPriority: "low",
    description: "Invita y gana 25€ para tus próximos cuidados.",
    icon: "present",
    id: "referral",
    metadata: "Promo",
    title: "Gana 25€ por amigo",
    type: "navigation"
  },
  {
    description: "Consejos para prevenir enfermedades comunes.",
    icon: "notifications",
    id: "care",
    metadata: "Lectura · 3 min",
    title: "Cuidado de mascotas",
    type: "navigation"
  }
];

const compactTaskItems: ActionListItem[] = [
  {
    id: "chip",
    description: "Activa reembolsos",
    icon: "microchip",
    priority: "urgent",
    title: "Añade el microchip",
    type: "actionable"
  },
  {
    id: "vet",
    description: "Incluido en tu plan",
    icon: "medicalDocument",
    priority: "normal",
    title: "Chequeo anual",
    type: "actionable"
  }
];

const meta = {
  title: "Components/Content/CardCarousel",
  component: CardCarousel,
  tags: ["autodocs"],
  args: {
    actionLabel: "Ver todos",
    items: promoItems,
    onActionClick: () => undefined,
    title: "Oportunidades"
  },
  parameters: {
    docs: {
      description: {
        component:
          "CardCarousel es el carrusel horizontal de **Card**: scroll con snap o libre, tamaño sm/md/lg, peek opcional y botón «Ver todos» en cabecera cuando hay más de `showActionThreshold` items. Cada slide es una `Card` (también puede llevar `children`, p. ej. ActionList)."
      }
    }
  }
} satisfies Meta<typeof CardCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const decorator: Decorator[] = [
  (StoryComponent) => (
    <div style={{ maxWidth: "100%", minWidth: 0, padding: 24, width: 390 }}>
      <StoryComponent />
    </div>
  )
];

export const PromoCarousel: Story = {
  decorators: decorator
};

/** Carrusel con una card intermedia que embebe ActionList (mismo patrón que Card → WithActionList). */
export const WithEmbeddedActionList: Story = {
  args: {
    description: "Desliza para ver promociones y acciones rápidas.",
    onActionClick: () => undefined,
    title: "Para ti"
  },
  decorators: decorator,
  render: (args) => (
    <CardCarousel
      {...args}
      items={[
        promoItems[0],
        {
          children: <ActionList grouping="grouped" items={compactTaskItems} />,
          description: "Dos pasos clave antes de la visita.",
          id: "quick-tasks",
          title: "Acciones rápidas",
          type: "info",
          visualType: "none"
        },
        promoItems[2]
      ]}
    />
  ),
};

export const PromoTractive: Story = {
  args: {
    description: undefined,
    items: promoItems,
    onActionClick: () => undefined,
    title: "Oportunidades"
  },
  decorators: decorator,
  parameters: {
    docs: {
      description: {
        story:
          "Promo Tractive: si el usuario no tiene Tractive, mostrar venta; si ya lo tiene, cambiar a insights. Si el filtro de contenido seleccionado es Promo, ocultar la etiqueta de tipo en la card."
      }
    }
  }
};

export const PromoFilterSelected: Story = {
  args: {
    description: undefined,
    items: promoItems.map((item) =>
      item.id === "tractive" ? { ...item, metadata: undefined } : item
    ),
    onActionClick: () => undefined,
    title: "Oportunidades"
  },
  decorators: decorator,
  parameters: {
    docs: {
      description: {
        story:
          "Cuando el chip/filtro de tipo de contenido ya esta seleccionado, no repetimos la etiqueta de tipo dentro de la card."
      }
    }
  }
};

export const FreeScroll: Story = {
  args: {
    scrollType: "free"
  },
  decorators: decorator
};

export const LargeCards: Story = {
  args: {
    cardSize: "lg",
    items: promoItems.map((item) => ({ ...item, orientation: "vertical" }))
  },
  decorators: decorator
};

export const SmallCards: Story = {
  args: {
    cardSize: "sm",
    items: promoItems
  },
  decorators: decorator
};

/** Una card por viewport (sin peek): útil cuando el carrusel ocupa todo el ancho del contenedor. */
export const NoPeek: Story = {
  args: {
    items: promoItems,
    peek: false
  },
  decorators: decorator
};

/** Solo dos slides: no aparece el botón «Ver todos» en cabecera (umbral por defecto = 2). */
export const TwoSlides: Story = {
  args: {
    items: promoItems.slice(0, 2),
    onActionClick: undefined,
    title: "Destacados"
  },
  decorators: decorator
};

export const SingleItemFallback: Story = {
  args: {
    items: [promoItems[0]],
    onActionClick: undefined,
    title: "Beneficio destacado"
  },
  decorators: decorator
};

export const Empty: Story = {
  args: {
    items: []
  },
  decorators: decorator
};
