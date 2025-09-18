import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

type Props = ButtonProps & {
  label?: string;
};

const TextButton = ({ label, children, ...props }: Props) => {
  return (
    <Button
      variant="text"
      color="inherit"
      sx={{ borderRadius: 8, textTransform: "none", px: 3, py: 1, fontSize: 14, border: 0 }}
      {...props}
    >
      {label || children}
    </Button>
  );
};

export default TextButton;
