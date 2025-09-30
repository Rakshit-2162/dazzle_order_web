import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DynamicIcon from "./DynamicIcon";

interface DashboardCardProps {
  icon: string;
  title: string;
  subtitle: string;
  route: string;
}

function DashboardCard({ icon, title, subtitle, route }: DashboardCardProps) {
  const navigate = useNavigate();
  return (
    <>
      <Card
        onClick={() => navigate(route)}
        sx={{
          borderRadius: 4,
          position: "relative",
          cursor: "pointer",
        }}
      >
        <CardContent>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <DynamicIcon
              name={icon}
              sx={{ fontSize: 120, color: "grey", opacity: 0.6 }}
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h2" sx={{ fontWeight: 600, pb: 1 }}>
                {title}
              </Typography>
              <Typography variant="h5" sx={{ color: "grey", opacity: 0.6 }}>
                {subtitle}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default DashboardCard;
