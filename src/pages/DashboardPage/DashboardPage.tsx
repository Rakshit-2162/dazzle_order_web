import { useTranslation } from "react-i18next";
import Navbar from "../../components/common/Navbar";
import { Box, Grid } from "@mui/material";
import DashboardCard from "../../components/DashboardCard";

function DashboardPage() {
  const { t } = useTranslation();
  const content = t("dashboard", { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    subtitle: string;
    route: string;
  }>;

  return (
    <>
      <Navbar
        buttons={[
          {
            label: "Logout",
            onClick: () => {},
            type: "primary",
          },
        ]}
      />

      <Box mx={4} mt={4}>
        <Grid container spacing={4}>
          {content.map((item, index) => (
            <Grid key={index} size={{ xs: 12, md: 6 }}>
              <DashboardCard
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                route={item.route}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default DashboardPage;
