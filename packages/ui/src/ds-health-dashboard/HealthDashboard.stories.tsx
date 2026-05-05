import type { Meta, StoryObj } from "@storybook/react-vite";
import { HealthDashboard, type HealthView } from "./HealthDashboard";

const meta = {
  title: "DS Health/Dashboard",
  component: HealthDashboard,
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {
    initialView: {
      control: "select",
      options: ["overview", "tokens", "components"] satisfies HealthView[]
    }
  }
} satisfies Meta<typeof HealthDashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: "01 Resumen",
  args: { initialView: "overview" }
};

export const Tokens: Story = {
  name: "02 Tokens",
  args: { initialView: "tokens" }
};

export const Components: Story = {
  name: "03 Componentes",
  args: { initialView: "components" }
};
