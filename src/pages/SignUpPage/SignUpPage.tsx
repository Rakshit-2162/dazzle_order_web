import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../../components/MySchema";
import { signup } from "../../services/ApiServices";
import loginSvg from "../../assets/login.svg";
import * as yup from "yup";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";
import Navbar from "../../components/common/Navbar";
import MyTextField from "../../components/common/MyTextField";
import PrimaryButton from "../../components/common/PrimaryButton";
import CustomSnackbar from "../../components/common/CustomSnackBar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { FormData } from "../LoginPage/LoginPage";

type FormData = yup.InferType<typeof signUpSchema>;

function SignUpPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    try {
      const response = await signup();

      // if (response) {
      //   console.log("Login successful:", response);
      //   localStorage.setItem("authToken", response.user["admin_password"]);

      //   setSnackbarOpen(true);
      //   setShouldNavigate(true);
      // } else {
      //   setErrorMessage(response || "Invalid login");
      // }
    } catch (err: unknown) {
      setErrorMessage(err + "");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    if (shouldNavigate) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Navbar
        buttons={[
          {
            label: "Login",
            onClick: () => navigate("/login"),
            type: "primary",
          },
        ]}
      />

      {/* Sign Up Form */}
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
                  Create An Account
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <MyTextField
                    name="name"
                    placeholder="Name"
                    control={control}
                    type="text"
                  />
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
                  <MyTextField
                    name="confirmPassword"
                    placeholder="Confirm Password"
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

      {/* ✅ Snackbar for success */}
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Registration successful!"
        icon={<CheckCircleIcon fontSize="inherit" />}
        color="success"
      />
    </>
  );
}

export default SignUpPage;
