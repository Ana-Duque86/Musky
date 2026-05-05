import type { ReactNode } from "react";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import "./Header.css";

export type RewardsStatus = "inactive" | "active" | "highlight";

export interface HeaderUser {
  name?: string | null;
  avatarUrl?: string | null;
}

export interface HeaderProps {
  user?: HeaderUser | null;
  notificationsCount?: number;
  rewardsStatus?: RewardsStatus;
  showNotifications?: boolean;
  showRewards?: boolean;
  notificationIcon?: ReactNode;
  rewardsIcon?: ReactNode;
  onAvatarClick?: () => void;
  onNotificationsClick?: () => void;
  onRewardsClick?: () => void;
}

export function Header({
  user,
  notificationsCount = 0,
  showNotifications = true,
  showRewards = true,
  notificationIcon,
  rewardsIcon,
  onAvatarClick,
  onNotificationsClick,
  onRewardsClick,
}: HeaderProps) {
  const displayName = user?.name?.trim();
  const badgeCount = Math.max(0, notificationsCount);
  const hasBadge = badgeCount > 0;
  const resolvedRewardsIcon =
    rewardsIcon ?? <Icon decorative name="present" size="sm" tone="brandPink" />;
  const resolvedNotificationIcon =
    notificationIcon ?? <Icon decorative name="notifications" size="sm" tone="brandPink" />;

  return (
    <header className="musky-header">
      <div className="musky-header__identity">
        <Avatar
          label="Abrir perfil de usuario"
          name={user?.name}
          onClick={onAvatarClick}
          src={user?.avatarUrl}
        />
        <span className="musky-header__greeting">
          <span className="musky-header__greeting-regular">¡Hola</span>
          {displayName ? (
            <>
              {" "}
              <strong className="musky-header__greeting-name">{displayName}!</strong>
            </>
          ) : (
            "!"
          )}
        </span>
      </div>

      <div className="musky-header__actions">
        {showRewards ? (
          <IconButton icon={resolvedRewardsIcon} label="Abrir recompensas" onClick={onRewardsClick} />
        ) : null}
        {showNotifications ? (
          <div className="musky-header__notification-slot">
            <IconButton
              badge={hasBadge}
              icon={resolvedNotificationIcon}
              label={
                hasBadge ? `Abrir notificaciones, ${badgeCount} pendientes` : "Abrir notificaciones"
              }
              onClick={onNotificationsClick}
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
