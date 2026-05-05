import type { Meta, StoryObj } from "@storybook/react-vite";
import { SegmentedControl } from "./SegmentedControl";

const meta = {
  title: "Components/Actions/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  args: {
    label: "Tipo de mascota",
    value: "dog",
    options: [
      { label: "Perro", value: "dog", icon: "🐶" },
      { label: "Gato", value: "cat", icon: "🐱" }
    ]
  },
  parameters: {
    docs: {
      description: {
        component:
          "Control segmentado para selección única. Forma parte del Button System como patrón de selección, no como CTA."
      }
    }
  }
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PetType: Story = {
  decorators: [
    (StoryComponent) => (
      <div style={{ padding: 24, width: 390 }}>
        <StoryComponent />
      </div>
    )
  ]
};

export const CatSelected: Story = {
  args: {
    value: "cat"
  },
  decorators: PetType.decorators
};
