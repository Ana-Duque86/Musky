import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { ActionList, type ActionListItem } from "./ActionList";

const items: ActionListItem[] = [
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
    title: "Vacunar a Perrín (6 meses)",
    type: "actionable"
  }
];

const meta = {
  title: "Components/Navigation/ActionList",
  component: ActionList,
  tags: ["autodocs"],
  args: {
    grouping: "grouped",
    items
  },
  parameters: {
    docs: {
      description: {
        component:
          "Action List agrupa tareas en una card; cada fila usa `layout/icon/size/sm` (leading 24px), slot chevron `layout/icon/size/md`, glifo chevron `layout/icon/size/sm`, `layout/container/insetDense` (padding 10), gap 8 entre columnas; titulo y chip alineados en vertical con gap 8; el titulo puede ocupar varias lineas."
      }
    }
  }
} satisfies Meta<typeof ActionList>;

export default meta;

type Story = StoryObj<typeof meta>;

const decorator: Decorator[] = [
  (StoryComponent) => (
    <div style={{ maxWidth: "100%", padding: 24, width: 360 }}>
      <StoryComponent />
    </div>
  )
];

export const Grouped: Story = {
  decorators: decorator
};

export const MixedPriorities: Story = {
  args: {
    items: [
      ...items,
      {
        id: "plan",
        description: "Mejoras en cobertura",
        icon: "notifications",
        priority: "low",
        title: "Novedades del plan",
        type: "informational"
      }
    ]
  },
  decorators: decorator
};

export const Informational: Story = {
  args: {
    items: [
      {
        id: "vaccine-info",
        description: "Programa la cita con antelación",
        icon: "injection",
        priority: "normal",
        title: "Vacunar a Perrín (6 meses)",
        type: "informational"
      },
      {
        id: "plan-info",
        description: "Mejoras en cobertura",
        icon: "notifications",
        priority: "low",
        title: "Novedades del plan",
        type: "informational"
      }
    ]
  },
  decorators: decorator
};

export const Flat: Story = {
  args: {
    grouping: "flat"
  },
  decorators: decorator
};

export const ReimbursementProgress: Story = {
  args: {
    items: [
      {
        description: "Falta añadir microchip",
        icon: "care",
        id: "refund-blocked",
        metadata: "18 de enero",
        progressStatus: "blocked",
        title: "Reembolso bloqueado",
        type: "actionable"
      },
      {
        description: "Estamos revisando la documentación",
        icon: "care",
        id: "refund-reviewing",
        metadata: "20 de enero",
        progressStatus: "reviewing",
        title: "Consulta veterinaria",
        type: "actionable"
      },
      {
        description: "Pago aprobado, transferencia en curso",
        icon: "care",
        id: "refund-processing",
        metadata: "22 de enero",
        progressStatus: "processingPayment",
        title: "Analítica completa",
        type: "actionable"
      },
      {
        description: "Reembolso enviado a tu cuenta",
        icon: "care",
        id: "refund-paid",
        metadata: "24 de enero",
        progressStatus: "paid",
        title: "Vacuna anual",
        type: "actionable"
      }
    ]
  },
  decorators: decorator
};
