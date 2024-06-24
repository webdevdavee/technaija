import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        "2xl": "0 0 7px rgba(0, 0, 0, 0.211)",
      },
    },
    screens: {
      ss: { max: "290px" },
      sm: { max: "320px" },
      smd: { max: "430px" },
      m: { max: "767px" },
      xl: { min: "768px", max: "1023px" },
      xxl: { min: "1024px", max: "1279px" },
      xxxl: { min: "1280px" },
      ultra: { min: "1500px" },
    },
  },
  plugins: [],
};
export default config;
