import { AppBar, Box, Toolbar } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import PrimaryButton from './PrimaryButton';
import TextButton from './TextButton';
import logo from "../../assets/logo.jpg";

interface NavbarProps {
  buttons?: { label: string; onClick: () => void; type?: 'primary' | 'text' }[];
}

function Navbar({ buttons = [] }: NavbarProps) {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        {/* Left: Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src={logo} alt="App Logo" style={{ height: 40 }} />
        </Box>

        {/* Right: Buttons */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {buttons.map((btn, index) => {
            if (btn.type === 'primary') {
              return (
                <PrimaryButton
                  key={index}
                  label={btn.label}
                  onClick={btn.onClick}
                />
              );
            }
            return (
              <TextButton
                key={index}
                label={btn.label}
                onClick={btn.onClick}
              />
            );
          })}
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
