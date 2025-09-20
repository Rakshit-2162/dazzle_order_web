import LandingPage from "../pages/LandingPage/LandingPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage/DashboardPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
