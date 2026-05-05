import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton";

const meta = {
  title: "Components/Actions/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    icon: "←",
    label: "Volver",
    variant: "secondary"
  },
  parameters: {
    docs: {
      description: {
        component:
          "IconButton es el set de acciones icon-only. Comparte jerarquía con Button: primary, secondary y tertiary; secondary es el default visual."
      }
    }
  }
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Secondary: Story = {
  decorators: [
    (StoryComponent) => (
      <div style={{ padding: 24 }}>
        <StoryComponent />
      </div>
    )
  ]
};

export const Tertiary: Story = {
  args: {
    icon: "∞",
    label: "Abrir acción terciaria",
    variant: "tertiary"
  },
  decorators: Secondary.decorators
};

export const Primary: Story = {
  args: {
    icon: "→",
    label: "Continuar",
    variant: "primary"
  },
  decorators: Secondary.decorators
};

export const WithBadge: Story = {
  args: {
    badge: true,
    icon: "🔔",
    label: "Abrir notificaciones, 1 nueva"
  },
  decorators: Secondary.decorators
};
