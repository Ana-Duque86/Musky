import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Actions/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Continuar",
    size: "lg",
    variant: "primary"
  },
  parameters: {
    docs: {
      description: {
        component:
          "Button System base para acciones primary, secondary, tertiary y link. No incluye ghost; las acciones de bajo peso usan link button."
      }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fullWidth: true
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ padding: 24, width: 390 }}>
        <StoryComponent />
      </div>
    )
  ]
};

export const Disabled: Story = {
  args: {
    disabled: true,
    fullWidth: true
  },
  decorators: Primary.decorators
};

export const Secondary: Story = {
  args: {
    children: "Cancelar",
    variant: "secondary"
  },
  decorators: Primary.decorators
};

export const Tertiary: Story = {
  args: {
    children: "Continuar",
    variant: "tertiary"
  },
  decorators: Primary.decorators
};

export const LinkButton: Story = {
  args: {
    children: "Ver condiciones",
    variant: "link"
  },
  decorators: Primary.decorators
};

export const WithIcon: Story = {
  args: {
    children: "Continuar",
    trailingIcon: "→"
  },
  decorators: Primary.decorators
};

export const Loading: Story = {
  args: {
    fullWidth: true,
    loading: true
  },
  decorators: Primary.decorators
};
