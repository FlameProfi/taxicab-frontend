import { Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./Components/Header"
import LoginPage from './Components/Login'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import RegisterPage from './Components/Register'
import UnauthorizedPage from './Components/Unauthorized/UnauthorizedPage'
import { AuthProvider } from './context/AuthContext'
import AboutPage from "./Pages/AboutPage"
import AutoParkPage from "./Pages/AutoParkPage"
import CallList from "./Pages/CallPage"
import DashboardPage from './Pages/Dashboard/DashboardPage'
import EmployeeList from "./Pages/EmployeePage"
import HomePage from "./Pages/MainPage"
import ProfilePage from './Pages/ProfilePage/ProfilePage'

function App() {
  return (
    <>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="autopark" element={<AutoParkPage />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="/calls" element={
            <ProtectedRoute>
                <CallList />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
          <ProtectedRoute>
            <>
              <ProfilePage />
            </>
          </ProtectedRoute>
        } />
          <Route path="/dashboard" element={
          <ProtectedRoute>
            <>
              <DashboardPage />
            </>
          </ProtectedRoute>
        } />
        <Route path="/unauthorized" element={
          <>
            <UnauthorizedPage />
          </>
        } />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
