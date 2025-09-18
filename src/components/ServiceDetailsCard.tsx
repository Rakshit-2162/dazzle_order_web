import { Box, Card, Typography, useTheme } from "@mui/material";
interface ServiceDetailsCardProps {
  icon: React.ReactNode; // you can pass an MUI Icon or any JSX
  title: string;
  subtitle: string;
}

const ServiceDetailsCard = ({
  icon,
  title,
  subtitle,
}: ServiceDetailsCardProps) => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 1 }}>
      <Card
        sx={{
          borderRadius: 4, // rounded-4
          textAlign: "left",
          p: 4,
          mb: 3,
          backgroundColor: "#212434",
          color: theme.palette.mode === "light" ? "white" : "",
        }}
      >
        {/* Icon Circle */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            bgcolor: "#101624",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            fontSize: 32, // fs-2
          }}
        >
          {icon}
        </Box>

        {/* Title */}
        <Typography variant="h3" sx={{ py: 1 }}>
          {title}
        </Typography>

        {/* Subtitle */}
        <Typography sx={{ pt: 1 }}>{subtitle}</Typography>
      </Card>
    </Box>
  );
};

export default ServiceDetailsCard;
