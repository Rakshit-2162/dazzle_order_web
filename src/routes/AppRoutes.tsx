import LandingPage from '../pages/LandingPage/LandingPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import { Route, Routes } from 'react-router-dom'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      {/* Add more routes here */}
    </Routes>
  )
}

export default AppRoutes
