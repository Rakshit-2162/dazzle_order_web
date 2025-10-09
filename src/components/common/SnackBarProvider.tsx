import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { type AlertColor } from "@mui/material/Alert";
import Slide, { type SlideProps } from "@mui/material/Slide";
import { setSnackbar } from "../../services/snackbarService";

interface SnackbarMessage {
  message: string;
  color: AlertColor;
  icon?: React.ReactNode;
}

interface SnackbarContextProps {
  showSnackbar: (
    message: string,
    color?: AlertColor,
    icon?: React.ReactNode
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }
  return context;
};

// 🔥 Transition animation
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [queue, setQueue] = useState<SnackbarMessage[]>([]);
  const [current, setCurrent] = useState<SnackbarMessage | null>(null);
  const [open, setOpen] = useState(false);

  const processQueue = () => {
    if (queue.length > 0 && !current) {
      const next = queue[0];
      setCurrent(next);
      setQueue((prev) => prev.slice(1));
      setOpen(true);
    }
  };

  useEffect(() => {
    processQueue();
  });

  const showSnackbar = (
    msg: string,
    clr: AlertColor = "info",
    icn?: React.ReactNode
  ) => {
    setQueue((prev) => [...prev, { message: msg, color: clr, icon: icn }]);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrent(null);
  };

  // Register global fn once
  useEffect(() => {
    setSnackbar(showSnackbar);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {current && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={SlideTransition} // 👈 Smooth slide-up transition
        >
          <Alert
            onClose={handleClose}
            severity={current.color}
            icon={current.icon || false}
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: 3,
            }}
          >
            {current.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};
