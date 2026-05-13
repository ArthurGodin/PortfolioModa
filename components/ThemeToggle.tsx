"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";

export type Theme = "light" | "dark";

export interface AppBarProps {
  logo?: ReactNode;
  appName?: string;
  onSearch?: (query: string) => void;
  userAvatar?: ReactNode;
  userName?: string;
  links?: { label: string; href: string }[];
}

export interface ThemeToggleProps {
  variant?: "default" | "appbar" | "icon";
  appBarProps?: AppBarProps;
  defaultTheme?: Theme;
  barHeight?: number;
  buttonSize?: number;
  duration?: number;
  onThemeChange?: (theme: Theme) => void;
  children?: ReactNode;
}

/* ── Tokens tuned to the two palettes ─────────────────────────────────────── */
const TOKENS: Record<Theme, Record<string, string>> = {
  light: {
    pageBg: "#F4DDE6",
    pageText: "#4C1208",
    barBg: "#4C1208",
    barText: "#F7F4D5",
    barBorder: "rgba(247,244,213,0.10)",
    btnBg: "#F4DDE6",
    btnText: "#4C1208",
    btnRing: "rgba(247,244,213,0.20)",
    inputBg: "rgba(247,244,213,0.10)",
    inputText: "#F7F4D5",
  },
  dark: {
    pageBg: "#051a12",
    pageText: "#F7F4D5",
    barBg: "#0A3323",
    barText: "#F7F4D5",
    barBorder: "rgba(247,244,213,0.10)",
    btnBg: "#D3968C",
    btnText: "#4C1208",
    btnRing: "rgba(247,244,213,0.20)",
    inputBg: "rgba(247,244,213,0.08)",
    inputText: "#F7F4D5",
  },
};

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

type CurtainPhase = "idle" | "falling" | "rising";
const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

export function ThemeToggle({
  variant = "default",
  appBarProps,
  defaultTheme = "light",
  barHeight: explicitBarHeight,
  buttonSize = 38,
  duration = 600,
  onThemeChange,
  children,
}: ThemeToggleProps) {
  const isAppBar = variant === "appbar";
  const isIcon = variant === "icon";
  const barHeight = explicitBarHeight ?? (isAppBar ? 68 : 44);

  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const curtainColorRef = useRef<string>("");
  const t = TOKENS[theme];

  useEffect(() => {
    if (typeof document !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark && theme !== "dark") setTheme("dark");
      else if (!isDark && theme !== "light") setTheme("light");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback(() => {
    if (phase !== "idle") return;
    const next: Theme = theme === "light" ? "dark" : "light";
    curtainColorRef.current = TOKENS[next].pageBg;
    setPhase("falling");

    setTimeout(() => {
      setTheme(next);
      onThemeChange?.(next);
      if (typeof document !== "undefined") {
        if (next === "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      }
      setPhase("rising");
      setTimeout(() => setPhase("idle"), duration + 60);
    }, duration);
  }, [phase, theme, duration, onThemeChange]);

  const barStyle: CSSProperties = {
    position: "fixed",
    top: 0, left: 0, right: 0,
    height: barHeight,
    background: t.barBg,
    color: t.barText,
    borderBottom: `1px solid ${t.barBorder}`,
    overflow: "visible",
    zIndex: 9998,
    transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
    display: isAppBar ? "flex" : "block",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isAppBar ? "0 28px" : "0",
    backdropFilter: "blur(12px)",
  };

  const btnScale = pressed ? 0.94 : hovered ? 1.12 : 1;
  const btnStyle: CSSProperties = {
    position: isAppBar || isIcon ? "relative" : "absolute",
    bottom: isAppBar || isIcon ? "auto" : -(buttonSize / 2),
    left: isAppBar || isIcon ? "auto" : "50%",
    transform: isAppBar || isIcon
      ? `scale(${btnScale})`
      : `translateX(-50%) scale(${btnScale})`,
    width: buttonSize,
    height: buttonSize,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: t.btnBg,
    color: t.btnText,
    boxShadow: `0 0 0 1.5px ${t.btnRing}, 0 8px 24px rgba(0,0,0,0.18)`,
    zIndex: 9999,
    outline: "none",
    transition: "background 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
    marginLeft: isAppBar ? "16px" : "0",
    flexShrink: 0,
  };

  const curtainStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: curtainColorRef.current,
    transformOrigin: "top",
    transform: phase === "falling" ? "scaleY(1)" : "scaleY(0)",
    transition: phase !== "idle" ? `transform ${duration}ms ${EASING}` : "none",
    zIndex: 9997,
    pointerEvents: "none",
  };

  const appBarSectionStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  if (isIcon) {
    return (
      <>
        <div aria-hidden="true" style={curtainStyle} />
        <button
          style={btnStyle}
          onClick={toggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setPressed(false); }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          aria-pressed={theme === "dark"}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
      </>
    );
  }

  return (
    <>
      <div aria-hidden="true" style={curtainStyle} />

      <div style={barStyle}>
        {isAppBar && (
          <div style={{ ...appBarSectionStyle, flex: 1 }}>
            {appBarProps?.logo && (
              <div style={{ display: "flex", alignItems: "center" }}>
                {appBarProps.logo}
              </div>
            )}
            {appBarProps?.appName && (
              <span
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  letterSpacing: "-0.01em",
                  fontStyle: "italic",
                }}
              >
                {appBarProps.appName}
              </span>
            )}
          </div>
        )}

        {isAppBar && appBarProps?.links && appBarProps.links.length > 0 && (
          <nav
            style={{
              ...appBarSectionStyle,
              flex: 1,
              justifyContent: "center",
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {appBarProps.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  opacity: 0.85,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}

        {isAppBar && (
          <div style={{ ...appBarSectionStyle, flex: 1, justifyContent: "flex-end" }}>
            {appBarProps?.userName && (
              <span style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                {appBarProps.userName}
              </span>
            )}
            {appBarProps?.userAvatar}
            <button
              style={btnStyle}
              onClick={toggle}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => { setHovered(false); setPressed(false); }}
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              aria-pressed={theme === "dark"}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        )}

        {!isAppBar && (
          <button
            style={btnStyle}
            onClick={toggle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setPressed(false); }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            aria-pressed={theme === "dark"}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        )}
      </div>

      {children}
    </>
  );
}
