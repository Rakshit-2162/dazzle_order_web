// snackbarService.ts
import type { AlertColor } from "@mui/material";

let snackbarFn: (
  message: string,
  color?: AlertColor,
  icon?: React.ReactNode
) => void;

export const setSnackbar = (
  fn: (message: string, color?: AlertColor, icon?: React.ReactNode) => void
) => {
  snackbarFn = fn;
};

export const showSnackbar = (
  message: string,
  color: AlertColor = "info",
  icon?: React.ReactNode
) => {
  if (snackbarFn) {
    snackbarFn(message, color, icon);
  } else {
    console.warn("Snackbar not ready yet");
  }
};
