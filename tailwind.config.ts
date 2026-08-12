import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: "hsl(var(--surface))",
        charcoal: "hsl(var(--charcoal))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        sans: ['"Instrument Sans"', 'sans-serif'],
      },
      /*
       * Type scale, decoupled from spacing.
       *
       * The root font-size used to be 125%, which answered the "text is too
       * small" feedback but inflated every rem-based gap and padding with it.
       * The root is back to 16px and the reading sizes are carried here
       * instead: xs–lg are the exact pixel sizes they rendered at before
       * (15 / 17.5 / 20 / 22.5px), so nothing anyone reads got smaller.
       *
       * Display sizes are deliberately pulled back — at 125% a section heading
       * was 37.5px and a hero 60px on a 390px phone, which cost several lines
       * of vertical space each and pushed content off the screen.
       */
      fontSize: {
        xs: ["0.9375rem", { lineHeight: "1.25rem" }],
        sm: ["1.09375rem", { lineHeight: "1.5rem" }],
        base: ["1.25rem", { lineHeight: "1.875rem" }],
        lg: ["1.40625rem", { lineHeight: "2rem" }],
        xl: ["1.5rem", { lineHeight: "2rem" }],
        "2xl": ["1.6875rem", { lineHeight: "2.125rem" }],
        "3xl": ["2rem", { lineHeight: "2.375rem" }],
        "4xl": ["2.375rem", { lineHeight: "2.625rem" }],
        "5xl": ["2.875rem", { lineHeight: "1.1" }],
        "6xl": ["3.5rem", { lineHeight: "1.1" }],
        "7xl": ["4.25rem", { lineHeight: "1.05" }],
        "8xl": ["5.5rem", { lineHeight: "1" }],
        "9xl": ["7rem", { lineHeight: "1" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
