import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // The "Trust" Scale (Slate Blue - Used by Banks/Hospitals)
        trust: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a", // Primary Text Color
        },
        // The "Action" Color (Reliable Blue)
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7", // Primary Button Color
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // The "Secure" Indicator (Verified Green)
        safe: {
          DEFAULT: "#059669",
          bg: "#ecfdf5",
        },
      },
      boxShadow: {
        glow: "0 0 15px rgba(2, 132, 199, 0.15)", // Soft blue glow
      },
    },
  },
  plugins: [],
};
export default config;
