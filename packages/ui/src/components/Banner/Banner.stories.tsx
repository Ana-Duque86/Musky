import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Banner } from "./Banner";

const meta = {
  title: "Components/Feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
  args: {
    children: "Podrás modificar esta información más adelante.",
    variant: "info"
  },
  parameters: {
    docs: {
      description: {
        component:
          "Banner contextual para estados globales, warnings, promos, errores y success sin interrumpir el flujo principal."
      }
    }
  }
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

const decorator: Decorator[] = [
  (StoryComponent) => (
    <div style={{ padding: 24, width: 390 }}>
      <StoryComponent />
    </div>
  )
];

export const Info: Story = {
  decorators: decorator
};

export const Warning: Story = {
  args: {
    children: "Es importante que la información coincida con la documentación de tu mascota.",
    variant: "warning"
  },
  decorators: decorator
};

export const Promo: Story = {
  args: {
    children: "Tienes un beneficio disponible por tiempo limitado.",
    inlineLink: <a href="#bases">Ver bases</a>,
    title: "Oferta Familia Numerosa",
    variant: "promo"
  },
  decorators: decorator
};

export const Danger: Story = {
  args: {
    children: "El código de descuento no es válido.",
    variant: "danger"
  },
  decorators: decorator
};

/** Icono leading con emoji (pasa por la prop `icon`); la variante sigue gobernando color de superficie y texto. */
export const DangerWithAlertEmoji: Story = {
  args: {
    children: "Tienes 1 acción urgente.",
    icon: "⚠️",
    title: "Acciones pendientes",
    variant: "danger"
  },
  decorators: decorator
};

export const Success: Story = {
  args: {
    children: "Todo está al día.",
    variant: "success"
  },
  decorators: decorator
};

export const WithAction: Story = {
  args: {
    action: (
      <Button size="sm" variant="tertiary">
        Revisar
      </Button>
    ),
    children: "Hay información pendiente para completar tu perfil.",
    title: "Tarea pendiente",
    variant: "warning"
  },
  decorators: decorator
};
