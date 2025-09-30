import * as MuiIcons from "@mui/icons-material";
import { type SvgIconProps } from "@mui/material"; // works in v5+

interface DynamicIconProps extends SvgIconProps {
  name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (MuiIcons as any)[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found. Falling back to Error.`);
    return <MuiIcons.ErrorRounded {...props} />;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;
