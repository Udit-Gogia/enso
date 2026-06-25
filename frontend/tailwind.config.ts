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
        display: ["Outfit", "ui-sans-serif", "system-serif", "sans-serif"],
        sans: ['"DM Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // --- Brand ---
        primary: {
          DEFAULT: "#1A73E8",
          hover: "#1666C8",
          ring: "rgba(26,115,232,0.14)",
          tint: "rgba(26,115,232,0.08)",
        },
        "brand-blue": "#4285F4",

        // --- Text / Ink ---
        ink: {
          DEFAULT: "#16161D",
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

        amber: "#F9AB00",
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
  plugins: [],
} satisfies Config;
