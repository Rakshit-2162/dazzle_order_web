import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";
import { loginSchema } from "../../components/MySchema";
import { login } from "../../services/ApiServices";
import loginSvg from "../../assets/login.svg";
import Navbar from "../../components/common/Navbar";
import MyTextField from "../../components/common/MyTextField";
import PrimaryButton from "../../components/common/PrimaryButton";
import { showSnackbar } from "../../services/snackbarService";
import { TaskAltRounded } from "@mui/icons-material";
import { delay } from "../../utills/delay";

type FormData = yup.InferType<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data.email, data.password);

      if (response) {
        console.log("Login successful:", response);
        localStorage.setItem("authToken", response.user["admin_password"]);
        showSnackbar("Login successful", 'success', <TaskAltRounded />)
        await delay(3000);
        navigate('/dashboard');
      } else {
        setErrorMessage(response || "Invalid login");
      }
    } catch (err: unknown) {
      setErrorMessage(err + "");
    }
  };

  return (
    <>
      {/* Header */}
      <Navbar
        buttons={[
          {
            label: "Sign Up",
            onClick: () => navigate("/signup"),
            type: "primary",
          },
        ]}
      />

      {/* Login Form */}
      <Container
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Left Image */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "center" }}>
            <img
              src={loginSvg}
              alt="Illustration"
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Grid>

          {/* Right Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" align="center" fontWeight={600}>
                  Login
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <MyTextField
                    name="email"
                    placeholder="Email"
                    control={control}
                    type="email"
                  />
                  <MyTextField
                    name="password"
                    placeholder="Password"
                    control={control}
                    type="password"
                  />

                  {errorMessage && (
                    <Alert severity="error" sx={{ my: 2, borderRadius: 3 }}>
                      {errorMessage}
                    </Alert>
                  )}

                  <PrimaryButton
                    label="Submit"
                    type="submit" // ✅ triggers RHF validation
                    sx={{ mt: 2, width: "100%" }}
                  />
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LoginPage;
