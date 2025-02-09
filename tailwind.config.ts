import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { blackA, mauve, violet, indigo, purple } from "@radix-ui/colors";

const config = {
  darkMode: 'class', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./App.jsx",
  ],
  theme: {
    extend: {
      transitionProperty: {
        spacing: 'margin, padding',
      },
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        ...purple,
        ...indigo,
        brand: {
          black: {
            100: '#747474',
            200: '#686868',
            300: '#5c5c5c',
            400: '#4e4e4e',
            500: '#434343',
            600: '#363636',
            700: '#292929',
            800: '#1c1c1c',
            900: '#0f0f0f',
            1000: '#000000',
          },
          white: {
            100: '#fafafa',
            200: '#f0f0f0',
            300: '#e5e5e5',
            400: '#d8d8d8',
            500: '#cfcfcf', // reference color
            600: '#c5c5c5',
            700: '#bababa',
            800: '#afafaf',
            900: '#a4a4a4',
          },
          green: {
            100: '#a6dcca',
            200: '#97d7c0',
            300: '#87d0b6',
            400: '#7acaaD',
            500: '#6cc2a2', // reference color
            600: '#63b997',
            700: '#58a687',
            800: '#4e9378',
            900: '#448068',
          },
          blue: {
            100: '#55b6d7',
            200: '#4ba3c1',
            300: '#418faf',
            400: '#35758b',
            500: '#2b6072', // reference color
            600: '#245361',
            700: '#193d48',
            800: '#0f292f',
            900: '#06161a',
          },
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
        enterFromRight: {
          from: { opacity: "0", transform: "translateX(200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { opacity: "0", transform: "translateX(-200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-200px)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
          to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
          to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        typing: "typing 2s steps(20) forwards, blink 1.06s step-end 2s",
        'border-fade': 'borderFade 2s forwards',
        scaleIn: "scaleIn 200ms ease",
        scaleOut: "scaleOut 200ms ease",
        fadeIn: "fadeIn 200ms ease",
        fadeOut: "fadeOut 200ms ease",
        enterFromLeft: "enterFromLeft 250ms ease",
        enterFromRight: "enterFromRight 250ms ease",
        exitToLeft: "exitToLeft 250ms ease",
        exitToRight: "exitToRight 250ms ease",
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      })
    }),
  ],
} satisfies Config;

export default config;