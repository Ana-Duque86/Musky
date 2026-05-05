import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta = {
  title: "Components/App Shell/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Header core para pantallas autenticadas: avatar de usuario siempre visible, saludo personalizado con nombre en bold y accesos rápidos a notificaciones/recompensas. Avatar, rewards y notifications son componentes separados; los iconos son reemplazables por props."
      }
    }
  }
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: { name: "Eduardo" },
    notificationsCount: 1
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ width: 390 }}>
        <StoryComponent />
      </div>
    )
  ]
};

export const GenericFallback: Story = {
  args: {
    notificationsCount: 0
  },
  decorators: Default.decorators
};

export const RewardsHidden: Story = {
  args: {
    showRewards: false,
    notificationsCount: 3
  },
  decorators: Default.decorators
};
