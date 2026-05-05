import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionListDeepPanel } from "./ActionListDeepPanel";

const meta = {
  title: "DS Health/Action List (detalle)",
  component: ActionListDeepPanel,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof ActionListDeepPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RevisionProfunda: Story = {
  name: "Revisión profunda",
  render: () => <ActionListDeepPanel />
};
