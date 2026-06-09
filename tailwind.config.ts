import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFCF8",
          100: "#F8F5ED",
          200: "#EEE9DA",
          300: "#DDD5C0",
        },
        forest: {
          500: "#2D6A4F",
          600: "#1B4332",
          700: "#081C15",
        },
        slate: {
          medical: "#2C3E50",
        }
      },
      fontFamily: {
        sans: ["Georgia", "Times New Roman", "serif"],
        mono: ["ui-monospace", "monospace"],
        ui: ["system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "card": "0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
        "inset-subtle": "inset 0 1px 3px rgba(0,0,0,0.08)",
        "pill-shadow": "0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
