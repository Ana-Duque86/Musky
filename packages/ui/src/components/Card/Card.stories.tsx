import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { ActionList, type ActionListItem } from "../ActionList";
import { Card } from "./Card";

const taskItems: ActionListItem[] = [
  {
    id: "microchip",
    description: "Necesario para activar reembolsos",
    icon: "microchip",
    priority: "urgent",
    title: "Añade el microchip",
    type: "actionable"
  },
  {
    id: "contract",
    description: "del seguro de tu segunda mascota.\nCaduca el 9 de febrero",
    icon: "medicalDocument",
    priority: "high",
    title: "Termina la contratación",
    type: "actionable"
  },
  {
    id: "vaccine",
    description: "Programa la cita con antelación",
    icon: "injection",
    priority: "normal",
    title: "Vacuna de los 6 meses de Perrín",
    type: "actionable"
  }
];

const meta = {
  title: "Components/Content/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    chipPriority: "normal",
    description: "Necesario para activar reembolsos",
    icon: "microchip",
    metadata: "Caduca el 9 de febrero",
    title: "Añade el microchip",
    type: "navigation"
  },
  parameters: {
    docs: {
      description: {
        component:
          "Card es la unidad de decisión del sistema: agrupa información y/o una acción en una superficie escaneable. Se usa standalone, dentro de CardCarousel, o con `children` (por ejemplo ActionList) para una card-resumen de tareas."
      }
    }
  }
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const decorator: Decorator[] = [
  (StoryComponent) => (
    <div style={{ maxWidth: "100%", padding: 24, width: 390 }}>
      <StoryComponent />
    </div>
  )
];

export const Navigation: Story = {
  decorators: decorator
};

/** Card informativa con lista de acciones embebida (patrón inicio / resumen). */
export const WithActionList: Story = {
  args: {
    chipPriority: undefined,
    description: "Completa estos pasos para activar reembolsos y recordatorios del plan.",
    icon: undefined,
    metadata: undefined,
    title: "Acciones pendientes",
    type: "info",
    visualType: "none"
  },
  decorators: decorator,
  render: (args) => (
    <Card {...args}>
      <ActionList grouping="grouped" items={taskItems} />
    </Card>
  )
};

export const DualActions: Story = {
  args: {
    chipPriority: "high",
    ctaPrimaryLabel: "Activar",
    ctaSecondaryLabel: "Más info",
    ctaType: "buttons",
    description: "Invita a tus amigos y gana más recompensas.",
    icon: "present",
    metadata: "Disponible ahora",
    title: "Gana 25€ por referido",
    type: "action"
  },
  decorators: decorator
};

export const Info: Story = {
  args: {
    chipPriority: undefined,
    description: "Consejos para cuidar la alimentación y detectar señales a tiempo.",
    icon: "notifications",
    metadata: "Lectura · 3 min",
    title: "Cuidado digestivo",
    type: "info"
  },
  decorators: decorator
};

export const Horizontal: Story = {
  args: {
    chipPriority: "low",
    description: "Beneficio incluido en tu plan.",
    icon: "medicalDocument",
    metadata: "Nuevo",
    orientation: "horizontal",
    title: "Consulta veterinaria"
  },
  decorators: decorator
};

export const ImageWithChip: Story = {
  args: {
    chipPriority: "low",
    description: "Beneficio incluido para cuidar y localizar a Perrín.",
    imageAlt: "Perro con localizador Tractive en el collar",
    imageUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=640&q=80",
    metadata: "Promo",
    title: "Obtén tu Tractive gratis",
    type: "navigation"
  },
  decorators: decorator
};

export const ImageWithoutChip: Story = {
  args: {
    chipPriority: undefined,
    description: "Beneficio incluido para cuidar y localizar a Perrín.",
    imageAlt: "Perro con localizador Tractive en el collar",
    imageUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=640&q=80",
    metadata: "Promo",
    title: "Obtén tu Tractive gratis",
    type: "navigation"
  },
  decorators: decorator
};

export const Disabled: Story = {
  args: {
    state: "disabled",
    title: "Promoción no disponible"
  },
  decorators: decorator
};

export const Loading: Story = {
  args: {
    chipPriority: "high",
    description: "Estamos cargando el detalle de tu solicitud.",
    icon: "care",
    state: "loading",
    title: "Reembolso en curso"
  },
  decorators: decorator
};

export const LinkCta: Story = {
  args: {
    chipPriority: undefined,
    ctaLabel: "Ver detalle",
    ctaType: "link",
    description: "Tu solicitud está lista para revisión.",
    icon: "notifications",
    metadata: "Actualizado hoy",
    title: "Documentación recibida",
    type: "action",
    visualType: "icon"
  },
  decorators: decorator
};

export const ElevationHigh: Story = {
  args: {
    chipPriority: "low",
    description: "Destacado temporalmente en tu área de beneficios.",
    elevation: "high",
    icon: "medicalDocument",
    metadata: "Promo",
    title: "Chequeo dental incluido",
    type: "info"
  },
  decorators: decorator
};
