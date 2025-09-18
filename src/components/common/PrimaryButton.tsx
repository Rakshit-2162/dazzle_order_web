import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

type Props = ButtonProps & {
  label?: string;
};

const PrimaryButton = ({ label, children, sx, ...props }: Props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        borderRadius: 8,
        textTransform: "none",
        px: 3,
        py: 1,
        fontSize: 14,
        border: 0,
        ...sx,
      }}
      {...props}
    >
      {label || children}
    </Button>
  );
};

export default PrimaryButton;
