// src/components/common/ThemeToggle.tsx
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../styles/theme";
import { useContext } from "react";
import { DarkMode, LightMode } from "@mui/icons-material";

const ThemeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeToggle;
