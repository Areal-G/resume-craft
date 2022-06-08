import { StyleSheet } from "@react-pdf/renderer";

// Tailwindcss Spacing Design System: https://tailwindcss.com/docs/theme#spacing
// It is converted from rem to pt (1rem = 12pt) since https://react-pdf.org/styling only accepts pt unit
export const spacing = {
  0: "0",
  0.5: "1.5pt",
  1: "3pt",
  1.5: "4.5pt",
  2: "6pt",
  2.5: "7.5pt",
  3: "9pt",
  3.5: "10.5pt",
  4: "12pt",
  5: "15pt",
  6: "18pt",
  7: "21pt",
  8: "24pt",
  9: "27pt",
  10: "30pt",
  11: "33pt",
  12: "36pt",
  14: "42pt",
  16: "48pt",
  20: "60pt",
  24: "72pt",
  28: "84pt",
  32: "96pt",
  36: "108pt",
  40: "120pt",
  44: "132pt",
  48: "144pt",
  52: "156pt",
  56: "168pt",
  60: "180pt",
  64: "192pt",
  72: "216pt",
  80: "240pt",
  96: "288pt",
  full: "100%",
} as const;

export const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexRowBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    width: "10pt",
    height: "10pt",
    fill: "#525252", // text-neutral-600
  },
});

/** Text colors for a clear, print-friendly hierarchy */
export const TEXT_COLORS = {
  heading: "#111827", // gray-900: name, titles, school, project
  body: "#374151", // gray-700: bullet text
  muted: "#6b7280", // gray-500: dates, summary, contact
  rule: "#e5e7eb", // gray-200: hairline under section headings
} as const;

/**
 * Mix a hex color with white. amount = 0 returns the color, 1 returns white.
 * Used for soft tag backgrounds that print well.
 */
export const tint = (hex: string, amount: number) => {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return "#f3f4f6";
  const num = parseInt(match[1], 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  const r = mix((num >> 16) & 255);
  const g = mix((num >> 8) & 255);
  const b = mix(num & 255);
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
};
