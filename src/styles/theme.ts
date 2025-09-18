import { createContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";

/**
 * 🎨 App Color Tokens
 * (light & dark mode palettes)
 */
export const tokens = (mode: "light" | "dark") => ({
  ...(mode === "dark"
    ? {
        primary: {
          main: "#003FFF", // primaryColor
        },
        activeBlue: {
          main: "#007aff", // kActiveBlue
        },
        blueAccent: {
          main: "#448aff", // default MUI blueAccent
        },
        blueAccent13: {
          main: "#e3ecfb", // kBlueAccent13
        },
        drawer: {
          main: "#66afff", // drawerBackgroundColor
        },
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
      }
    : {
        primary: {
          main: "#003FFF", // same across light/dark
        },
        activeBlue: {
          main: "#007aff",
        },
        blueAccent: {
          main: "#448aff",
        },
        blueAccent13: {
          main: "#e3ecfb",
        },
        drawer: {
          main: "#66afff",
        },
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
      }),
});

/**
 * 📌 Theme Settings
 */
export const themeSettings = (mode: "light" | "dark") => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      primary: {
        main: colors.primary.main,
      },
      secondary: {
        main: colors.activeBlue.main,
      },
      background: {
        default: mode === "dark" ? "#0c101b" : "#fcfcfc",
        paper: mode === "dark" ? "#141b2d" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#111111",
        secondary: mode === "dark" ? "#cbd5e1" : "#374151",
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 12,
      h1: { fontFamily: "Poppins, sans-serif", fontSize: 40, fontWeight: 700 },
      h2: { fontFamily: "Poppins, sans-serif", fontSize: 32, fontWeight: 600 },
      h3: { fontFamily: "Poppins, sans-serif", fontSize: 24, fontWeight: 600 },
      h4: { fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 500 },
      h5: { fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 500 },
      h6: { fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 400 },
      body1: { fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 400 },
      body2: { fontFamily: "Poppins, sans-serif", fontSize: 12, fontWeight: 300 },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: "Poppins, sans-serif",
            backgroundColor: mode === "dark" ? "#0c101b" : "#fcfcfc",
          },
          h1: { fontFamily: "Poppins, sans-serif" },
          h2: { fontFamily: "Poppins, sans-serif" },
          h3: { fontFamily: "Poppins, sans-serif" },
          h4: { fontFamily: "Poppins, sans-serif" },
          h5: { fontFamily: "Poppins, sans-serif" },
          h6: { fontFamily: "Poppins, sans-serif" },
          p: { fontFamily: "Poppins, sans-serif" },
        },
      },
    },
  };
};

/**
 * 🌙 Color Mode Context
 */
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

/**
 * 🔄 Custom Hook to Use Mode
 */
export const useMode = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode] as const;
};
