import type { HTMLAttributes } from "react";
import { RewardGiftBadgeSvg, RewardGiftPromoSvg } from "./reward-gift-icons";
import "./DoubleRewardCard.css";

export type DoubleRewardCardState = "empty" | "single" | "multiple";
export type DoubleRewardCardActionType = "copy" | "share";

export interface DoubleRewardCardReward {
  id: string;
  amount: number;
  activationLabel: string;
  currency?: string;
}

export interface DoubleRewardCardProps extends HTMLAttributes<HTMLElement> {
  rewardsTotal?: number;
  currency?: string;
  rewards?: DoubleRewardCardReward[];
  referralCode?: string;
  rewardState?: DoubleRewardCardState;
  promoTitle?: string;
  promoBody?: string;
  actionType?: DoubleRewardCardActionType;
  actionLabel?: string;
  onReferralAction?: () => void;
}

const defaultReferralCode = "ORI02321";
const defaultPromoTitle = "Invita a tus amigos y gana";
const defaultPromoBody = "25€ para ti y para quien contrate con tu código.";

export function DoubleRewardCard({
  actionLabel,
  actionType = "share",
  className,
  currency = "EUR",
  onReferralAction,
  promoBody = defaultPromoBody,
  promoTitle = defaultPromoTitle,
  referralCode = defaultReferralCode,
  rewards = [],
  rewardsTotal = 0,
  rewardState,
  ...props
}: DoubleRewardCardProps) {
  const resolvedState = rewardState ?? getRewardState(rewardsTotal, rewards.length);
  const hasBalance = resolvedState !== "empty";
  const visibleRewards = resolvedState === "multiple" ? rewards.slice(0, 2) : rewards.slice(0, 1);
  const resolvedActionLabel =
    actionLabel ??
    (actionType === "copy"
      ? `Copiar código ${referralCode}`
      : `Compartir código ${referralCode}`);

  return (
    <section
      {...props}
      aria-label={props["aria-label"] ?? "Recompensas"}
      className={[
        "musky-double-reward-card",
        `musky-double-reward-card--${resolvedState}`,
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {hasBalance ? (
        <div className="musky-double-reward-card__balance">
          <div className="musky-double-reward-card__balance-header">
            <strong className="musky-double-reward-card__amount">
              {formatCurrency(rewardsTotal, currency)}
            </strong>
            <span aria-hidden="true" className="musky-double-reward-card__badge">
              <RewardGiftBadgeSvg />
            </span>
          </div>
          <span className="musky-double-reward-card__label">Recompensas acumuladas</span>
          {visibleRewards.map((reward) => (
            <span className="musky-double-reward-card__breakdown" key={reward.id}>
              {formatCurrency(reward.amount, reward.currency ?? currency)} · {reward.activationLabel}
            </span>
          ))}
        </div>
      ) : null}

      <div className="musky-double-reward-card__promo">
        <span aria-hidden="true" className="musky-double-reward-card__decor musky-double-reward-card__decor--glow" />
        <span aria-hidden="true" className="musky-double-reward-card__decor musky-double-reward-card__decor--wave" />

        <span aria-hidden="true" className="musky-double-reward-card__gift">
          <RewardGiftPromoSvg />
        </span>

        <div className="musky-double-reward-card__promo-content">
          <strong className="musky-double-reward-card__promo-title">{promoTitle}</strong>
          <span className="musky-double-reward-card__promo-body">{promoBody}</span>
          <div className="musky-double-reward-card__code-pill">
            <code className="musky-double-reward-card__code">{referralCode}</code>
            <button
              aria-label={resolvedActionLabel}
              className="musky-double-reward-card__copy"
              onClick={onReferralAction}
              type="button"
            >
              <CopyIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function getRewardState(total: number, count: number): DoubleRewardCardState {
  if (total <= 0 && count === 0) return "empty";
  if (count > 1) return "multiple";
  return "single";
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    style: "currency"
  }).format(amount);
}

function CopyIcon() {
  return (
    <span aria-hidden="true" className="musky-double-reward-card__copy-icon">
      <span className="musky-double-reward-card__copy-back" />
      <span className="musky-double-reward-card__copy-front" />
    </span>
  );
}
