import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        display: [
          "General Sans",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // --- Brand ---
        primary: {
          DEFAULT: "#7e7de8",
          dark: "#8251ed",
          hover: "#5453BB", // primary-deep darkened ~12%
          ring: "rgba(126,125,232,0.14)", // rgb of #7e7de8
          tint: "rgba(126,125,232,0.08)", // rgb of #7e7de8
          deep: "#5F5ED4", // NEW — text-legible violet for the "One app, three jobs" feature card
        },
        secondary: {
          DEFAULT: "#86868b",
        },
        "brand-blue": {
          DEFAULT: "#4285F4",
          deep: "#2A56C6", // NEW — text-legible blue for the "Every category" feature card
        },

        // --- Text / Ink ---
        ink: {
          DEFAULT: "#171717",
          secondary: "#3A3D47",
          body: "#5B5F6B",
          muted: "#80828E",
          placeholder: "#A0A2AD",
        },

        // --- Surfaces ---
        surface: {
          DEFAULT: "#FFFFFF",
          page: "#F4F4F7",
          radial: "#EAF1FE",
        },

        // --- Borders ---
        border: {
          DEFAULT: "#E9EAEE",
          soft: "#E6E7EB",
          input: "#DADBE2",
        },

        success: {
          DEFAULT: "#34A853",
          deep: "#1E8E3E",
          bg: "#DCFCE7",
        },

        destructive: {
          DEFAULT: "#EA4335", // same as danger
          foreground: "#FFFFFF",
        },
        danger: {
          DEFAULT: "#EA4335",
          bg: "#FEE2E2",
        },

        warning: {
          DEFAULT: "#FBBC05",
          bg: "#FEF9C3",
        },

        amber: {
          DEFAULT: "#F9AB00",
          deep: "#B45309", // NEW — text-legible amber for the "Send a request" feature card
        },

        teal: {
          DEFAULT: "#0D9488", // NEW — the "Know when they're open" feature card's own hue
          deep: "#0F766E", // NEW
        },
      },
      boxShadow: {
        card: "0 24px 60px -28px rgba(22,22,29,.22)",
        badge: "0 4px 14px -6px rgba(22,22,29,.12)",
        cta: "0 14px 30px -10px rgba(26,115,232,.65)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // tailwind.config.ts
  // tailwind.config.ts
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        ".text-halo-lg": {
          WebkitTextStroke: "8px #fff",
          paintOrder: "stroke fill",
          textShadow: "0 0 20px #fff, 0 0 36px #fff",
        },
        ".text-halo-md": {
          WebkitTextStroke: "5px #fff",
          paintOrder: "stroke fill",
          textShadow: "0 0 14px #fff, 0 0 26px #fff",
        },
        ".text-halo-sm": {
          // no stroke — see note below on why small text gets a different treatment
          textShadow:
            "0 0 3px #fff, 0 0 6px #fff, 0 0 9px #fff, 0 0 14px #fff, 0 0 20px #fff",
        },
      });
    },
  ],
} satisfies Config;
