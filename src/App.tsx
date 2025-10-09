import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./styles/theme";
import AppRoutes from "./routes/AppRoutes";
import { SnackbarProvider } from "./components/common/SnackBarProvider";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ pt: { xs: 7, sm: 8 } }}>
          {/* all page content goes here */}
          <SnackbarProvider>
            <CssBaseline />
            <AppRoutes />
          </SnackbarProvider>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
