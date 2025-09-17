import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginSvg from "../../assets/login.svg";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";
import {login} from "../../services/ApiServices";
import Navbar from "../../components/common/Navbar";
import MyTextField from "../../components/common/MyTextField";
import PrimaryButton from "../../components/common/PrimaryButton";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
type FormData = yup.InferType<typeof schema>;

const LoginPage = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data.email, data.password);

      if (response) {
        console.log("Login successful:", response);
        navigate("/dashboard");
      } else {
        setErrorMessage(response || "Invalid login");
      }
    } catch (err: any) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error(err);
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
            <Card sx={{ color: "white", borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Login
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <MyTextField
                    name="email"
                    placeholder="Email"
                    control={control}
                    label="Email"
                    type="email"
                  />
                  <MyTextField
                    name="password"
                    placeholder="Password"
                    control={control}
                    label="Password"
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
