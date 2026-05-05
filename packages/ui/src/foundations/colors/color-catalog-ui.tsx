import type { CSSProperties, ReactNode } from "react";
import type { ColorTokenItem } from "./color-tokens-data";

function isTransparentTokenValue(value: string): boolean {
  if (value === "transparent") return true;
  const m = value.match(/^#([0-9a-f]{6})([0-9a-f]{2})$/i);
  return Boolean(m && m[2].toUpperCase() === "00");
}

export function colorSwatchStyle(token: ColorTokenItem): CSSProperties {
  const isTransparent = isTransparentTokenValue(token.value);

  return {
    background: isTransparent
      ? `linear-gradient(45deg, #d9d9d9 25%, transparent 25%), linear-gradient(-45deg, #d9d9d9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d9d9d9 75%), linear-gradient(-45deg, transparent 75%, #d9d9d9 75%), var(${token.cssVar})`
      : `var(${token.cssVar})`,
    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
    backgroundSize: isTransparent ? "16px 16px" : undefined
  };
}

export function TokenSwatch({ token }: { token: ColorTokenItem }) {
  return (
    <article
      style={{
        background: "var(--semantic-background-surface)",
        border: "1px solid var(--semantic-border-subtle)",
        borderRadius: 16,
        boxShadow: "0 1px 2px rgb(17 16 16 / 4%)",
        overflow: "hidden"
      }}
    >
      <div style={{ ...colorSwatchStyle(token), height: 88 }} />
      <div style={{ display: "grid", gap: 6, padding: 14 }}>
        <strong style={{ color: "var(--semantic-text-primary)", fontSize: 13, lineHeight: "18px" }}>
          {token.name}
        </strong>
        <code style={{ color: "var(--semantic-text-secondary)", fontSize: 11, lineHeight: "16px", wordBreak: "break-all" }}>
          {token.cssVar}
        </code>
        <span style={{ color: "var(--semantic-text-primary)", fontSize: 12 }}>{token.value}</span>
        <span style={{ color: "var(--semantic-text-secondary)", fontSize: 12, lineHeight: 1.45 }}>{token.role}</span>
      </div>
    </article>
  );
}

export function TokenGrid({ tokens }: { tokens: ColorTokenItem[] }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 14,
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))"
      }}
    >
      {tokens.map((token) => (
        <TokenSwatch key={token.name} token={token} />
      ))}
    </div>
  );
}

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function CatalogSection({ eyebrow, title, description, children }: SectionProps) {
  return (
    <section style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gap: 6 }}>
        {eyebrow ? (
          <p
            style={{
              color: "var(--semantic-action-link-text)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              margin: 0,
              textTransform: "uppercase"
            }}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2 style={{ color: "var(--semantic-text-primary)", fontSize: 20, lineHeight: "28px", margin: 0 }}>
          {title}
        </h2>
        {description ? (
          <p style={{ color: "var(--semantic-text-secondary)", fontSize: 14, lineHeight: "21px", margin: 0 }}>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function CatalogShell({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        background: "var(--semantic-background-app)",
        boxSizing: "border-box",
        display: "grid",
        gap: 36,
        minHeight: "100vh",
        padding: "28px 32px 48px",
        width: "100%"
      }}
    >
      {children}
    </main>
  );
}
