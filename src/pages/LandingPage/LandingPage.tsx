import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Grid, Typography } from "@mui/material";
import Navbar from "../../components/common/Navbar";
import PrimaryButton from "../../components/common/PrimaryButton";
import ServiceDetailsCard from "../../components/ServiceDetailsCard";
import DynamicIcon from "../../components/DynamicIcon";
import { TipsAndUpdatesRounded } from "@mui/icons-material";
import { isLoggedIn, logout } from "../../utills/auth";

function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const loggedIn = isLoggedIn();
  const content = t("services.content", { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    subtitle: string;
  }>;

  return (
    <>
      <Navbar
        buttons={
          loggedIn
            ? [
                {
                  label: "Dashboard",
                  onClick: () => navigate("/dashboard"),
                  type: "text",
                },
                {
                  label: "Logout",
                  onClick: () => {
                    logout();
                    navigate("/login");
                  },
                  type: "primary",
                },
              ]
            : [
                {
                  label: "Login",
                  onClick: () => navigate("/login"),
                  type: "primary",
                },
              ]
        }
      />
      {/* Home */}
      <Grid container spacing={3} mx={{ xs: 2, sm: 4 }} mt={{ xs: 4, md: 8 }}>
        {/* Left side */}
        <Grid size={{ xs: 12, md: 6 }} py={4}>
          <Typography fontWeight={600} fontSize={{ xs: 32, sm: 40, md: 50 }}>
            {t("home.title")}
          </Typography>
          <Typography variant="h6" color="grey.500" py={4}>
            {t("home.subtitle")}
          </Typography>
          <PrimaryButton
            label="Get Started"
            onClick={() => navigate("/login")}
            sx={{ px: { xs: 6, sm: 10, md: 12 }, fontSize: { xs: 16, md: 20 } }}
          />
        </Grid>

        {/* Right side */}
        <Grid
          size={{ xs: 12, md: 6 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={{ xs: 4, md: 0 }}
        >
          <TipsAndUpdatesRounded
            sx={{ fontSize: { xs: "120px", sm: "180px", md: "225px" } }}
          />
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

        <Grid container spacing={2}>
          {content.map((item, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <ServiceDetailsCard
                icon={<DynamicIcon name={item.icon} />}
                title={item.title}
                subtitle={item.subtitle}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default LandingPage;
