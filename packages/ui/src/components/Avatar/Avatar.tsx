import "./Avatar.css";

export interface AvatarProps {
  name?: string | null;
  src?: string | null;
  label?: string;
  onClick?: () => void;
}

function initials(value?: string | null) {
  if (!value) return "U";
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ name, src, label = "Abrir perfil de usuario", onClick }: AvatarProps) {
  const content = src ? (
    <img alt="" className="musky-avatar__image" src={src} />
  ) : (
    <span className="musky-avatar__fallback">{initials(name)}</span>
  );

  if (!onClick) {
    return (
      <span aria-label={label} className="musky-avatar">
        {content}
      </span>
    );
  }

  return (
    <button aria-label={label} className="musky-avatar" onClick={onClick} type="button">
      {content}
    </button>
  );
}
