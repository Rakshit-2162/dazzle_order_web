import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  icon?: React.ReactNode;
  color?: AlertColor; // "success" | "info" | "warning" | "error"
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
  message,
  icon,
  color = "info",
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // ⏱️ Auto close after 3 sec
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={color}
        icon={icon || false} // use provided icon, disable default if none
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
