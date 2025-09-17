import * as MuiIcons from "@mui/icons-material";

interface DynamicIconProps {
  name: string;
  size?: "small" | "medium" | "large";
}

const DynamicIcon = ({ name, size = "large" }: DynamicIconProps) => {
  // Try to find the icon from MUI’s exports
  const IconComponent = (MuiIcons as any)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found. Falling back to Error.`);
    return <MuiIcons.ErrorRounded fontSize={size} />;
  }

  return <IconComponent fontSize={size} />;
};

export default DynamicIcon;
