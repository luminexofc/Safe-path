// Motion tokens vendored from beui (@beui/animated-sidebar, button, tabs, badge)
// Source: beui MCP lib/ease.ts (canonical physics used across beui components).
export const EASE_OUT = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.77, 0, 0.175, 1];
export const EASE_DRAWER = [0.32, 0.72, 0, 1];
export const EASE_OUT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

export const SPRING_PRESS = { type: "spring", stiffness: 500, damping: 30, mass: 0.6 };
export const SPRING_SWAP = { type: "spring", stiffness: 460, damping: 30, mass: 0.55 };
export const SPRING_PANEL = { type: "spring", stiffness: 420, damping: 40, mass: 0.5 };
export const SPRING_LAYOUT = { type: "spring", stiffness: 360, damping: 32, mass: 0.6 };
export const TABS_GLIDE = { type: "spring", stiffness: 245, damping: 36, mass: 1.2 };
