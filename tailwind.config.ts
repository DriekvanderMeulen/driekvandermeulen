import type { Config } from "tailwindcss";

export default {
  darkMode: 'class', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'flare': 'linear-gradient(to right, #f12711, #f5af19)',

      },
      colors: {
        brand: {
          pureblack: "#000000",
          purewhite: "#ffffff",
          black: {
            light: "#26262C",
            regular: "#1C1C21",
            dark: "#131316"
          },
          white: {
            light: "#E9E9EC",
            regular: "#DEDEE3",
            dark: "#D3D3D9"
          },
          cyan: {
            light: "#15C8CB",
            regular: "#13B6B9",
            dark: "#11A4A6"
          },
          magenta: {
            light: "#FB4BA3",
            regular: "#FB3799",
            dark: "#FB238F"
          },
          blue: {
            regular:"#003F91",
          }
        },
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
        borderFade: {
          "0%": {
            borderColor: "#FFFFFF",
          },
          "100%": {
            borderColor: "transparent",
          },
        },
      },
      animation: {
        typing: "typing 2s steps(20) forwards, blink 1.06s step-end 2s",
        'border-fade': 'borderFade 2s forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;