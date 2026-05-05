import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { DoubleRewardCard, type DoubleRewardCardReward } from "./DoubleRewardCard";

const rewards: DoubleRewardCardReward[] = [
  {
    activationLabel: "Se activan el 9 feb",
    amount: 25,
    id: "reward-1"
  },
  {
    activationLabel: "Se activan el 18 mar",
    amount: 25,
    id: "reward-2"
  }
];

const meta = {
  title: "Components/Rewards/DoubleRewardCard",
  component: DoubleRewardCard,
  tags: ["autodocs"],
  args: {
    referralCode: "ORI02321",
    rewards: rewards.slice(0, 1),
    rewardsTotal: 25
  },
  parameters: {
    docs: {
      description: {
        component:
          "Card compuesta para recompensas: muestra balance acumulado y activa el loop de invitación con código + acción de copiar/compartir."
      }
    }
  }
} satisfies Meta<typeof DoubleRewardCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const decorator: Decorator[] = [
  (StoryComponent) => (
    <div style={{ padding: 24, width: 352 }}>
      <StoryComponent />
    </div>
  )
];

export const SingleReward: Story = {
  decorators: decorator
};

export const MultipleRewards: Story = {
  args: {
    rewards,
    rewardsTotal: 50
  },
  decorators: decorator
};

export const Empty: Story = {
  args: {
    rewardState: "empty",
    rewards: [],
    rewardsTotal: 0
  },
  decorators: decorator
};

export const CopyAction: Story = {
  args: {
    actionType: "copy",
    rewards: rewards.slice(0, 1),
    rewardsTotal: 25
  },
  decorators: decorator
};
