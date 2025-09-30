import LandingPage from "../pages/LandingPage/LandingPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import MyPurchaseOrdersPage from "../pages/MyPurchaseOrdersPage/MyPurchaseOrdersPage";
import MyAccountPage from "../pages/MyAccountPage/MyAccountPage";
import ViewPurchaseOrderPage from "../pages/ViewPurchaseOrderPage/ViewPurchaseOrderPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/dashboard/viewAllPurchaseOrders"
          element={<MyPurchaseOrdersPage />}
        />
        <Route
          path="/dashboard/viewAllPurchaseOrders/:order_id"
          element={<ViewPurchaseOrderPage />}
        />
        <Route path="/dashboard/myAccount" element={<MyAccountPage />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
