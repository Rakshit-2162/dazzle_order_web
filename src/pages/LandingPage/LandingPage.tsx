import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography } from "@mui/material";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import Navbar from "../../components/common/Navbar";
import PrimaryButton from "../../components/common/PrimaryButton";
import ServiceDetailsCard from "../../components/ServiceDetailsCard";

function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Navbar
        buttons={[
          { label: "Home", onClick: () => navigate("/"), type: "text" },
          {
            label: "Dashboard",
            onClick: () => navigate("/dashboard"),
            type: "text",
          },
          {
            label: "Login",
            onClick: () => navigate("/login"),
            type: "primary",
          },
        ]}
      />

      {/* Home */}
      <Grid container columns={12} mx={4} mt={8} columnSpacing={3}>
        <Grid size={6} py={4}>
          <Typography fontWeight={600} fontSize={50}>
            {t("home.title")}
          </Typography>
          <Typography variant="h5" color="grey.500" py={4}>
            {t("home.subtitle")}
          </Typography>
          <PrimaryButton
            label="Get Started"
            onClick={() => navigate("/login")}
            sx={{ px: 12, fontSize: 20 }}
          />
        </Grid>
        <Grid size={6} justifyContent="center" display="flex">
          <BadgeRoundedIcon sx={{ fontSize: 300 }} />
        </Grid>
      </Grid>

      {/* Services */}
      <Box mx={4}>
        <Typography
          fontWeight={600}
          fontSize={40}
          pt={4}
          justifyContent={"center"}
          display={"flex"}
        >
          {t("services.title")}
        </Typography>
        <Typography
          variant="h5"
          color="grey.500"
          display="flex"
          justifyContent="center"
          py={2}
        >
          {t("services.subtitle")}
        </Typography>
        <ServiceDetailsCard
          icon="B"
          title="{item.title}"
          subtitle="{item.subtitle}"
        />
      </Box>
    </>
  );
}

export default LandingPage;
