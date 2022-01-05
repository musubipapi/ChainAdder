// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  background: "red.500",
};

const fonts = {
  heading: "VT323",
  body: "VT323",
};
const breakpoints = createBreakpoints({
  sm: "320px",
  md: "650px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
});
export const theme = extendTheme({
  colors,
  fonts,
  breakpoints,
  styles: {
    global: (props: any) => ({
      html: {
        fontFamily: "body",
        lineHeight: "base",
      },
    }),
  },
});
