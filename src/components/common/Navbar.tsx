import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ThemeToggle from "./ThemeToggle";
import PrimaryButton from "./PrimaryButton";
import TextButton from "./TextButton";
import logo from "../../assets/logo.jpg";

interface NavbarProps {
  buttons?: { label: string; onClick: () => void; type?: "primary" | "text" }[];
}

function Navbar({ buttons = [] }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
          {/* Left: Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={logo} alt="App Logo" style={{ height: 40 }} />
          </Box>

          {/* Right side */}
          {isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ThemeToggle />
              <IconButton edge="end" color="inherit" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {buttons.map((btn, index) =>
                btn.type === "primary" ? (
                  <PrimaryButton key={index} label={btn.label} onClick={btn.onClick} />
                ) : (
                  <TextButton key={index} label={btn.label} onClick={btn.onClick} />
                )
              )}
              <ThemeToggle />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Expandable Menu (Mobile only) */}
      {isMobile && (
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
          <List sx={{ backgroundColor: theme.palette.background.paper }}>
            {buttons.map((btn, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => {
                    btn.onClick();
                    setMenuOpen(false);
                  }}
                >
                  <ListItemText
                    primary={btn.label}
                    sx={{
                      fontWeight: btn.type === "primary" ? "bold" : "normal",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

export default Navbar;
