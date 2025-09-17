import { TextField, useTheme } from "@mui/material";
import { Controller } from "react-hook-form";

interface MyTextFieldProps {
  name: string;
  control: any;
  label?: string;
  type?: string;
  placeholder?: string;
  fullWidth?: boolean;
  variant?: "outlined" | "filled" | "standard";
  margin?: "none" | "dense" | "normal";
  size?: "small" | "medium";
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

const MyTextField = ({
  name,
  control,
  type = "text",
  placeholder,
  fullWidth = true,
  variant = "outlined",
  margin = "normal",
  size = "medium",
  disabled = false,
  multiline = false,
  rows,
}: MyTextFieldProps) => {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          placeholder={placeholder}
          fullWidth={fullWidth}
          variant={variant}
          margin={margin}
          size={size}
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          error={!!error}
          helperText={error ? error.message : ""}
          sx={{
            bgcolor: theme.palette.mode === "dark" ? "#101624" : "#ECECEC",
            borderRadius: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "& fieldset": {
                borderColor: "transparent", // remove border
              },
              "&:hover fieldset": {
                borderColor: "transparent", // no border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent", // remove blue line
                boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.3)", // optional soft glow
              },
            },
          }}
        />
      )}
    />
  );
};

export default MyTextField;
