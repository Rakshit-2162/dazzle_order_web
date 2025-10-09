import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import logo from "../../assets/logo.jpg";

interface NavbarProps {
  label: string;
  color: string;
}

function TextNavbar({ label, color = "transparent" }: NavbarProps) {
  const theme = useTheme();

  return (
    <>
      <AppBar
        position="fixed"
        color={theme.palette.mode === "dark" ? "default" : "inherit"}
        elevation={0}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
        >
          {/* Left: Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={logo} alt="App Logo" style={{ height: 40 }} />
          </Box>

          {/* Right side */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box
              bgcolor={color}
              color={color === "transparent" ? "primary.main" : "white"}
              borderRadius={2}
              px={2}
              py={1}
            >
              <Typography variant="h4">{label}</Typography>
            </Box>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TextNavbar;
