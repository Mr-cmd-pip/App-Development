import { useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Approved from "./pages/admin/AdminApproved";
import Declined from "./pages/admin/AdminDeclined";
import Pending from "./pages/admin/AdminPending";
import AdminCalendar from "./pages/admin/AdminCalendar";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentRequestAppointment from "./pages/student/StudentRequestAppointment";
import StudentAppointments from "./pages/student/StudentAppointments";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Define the paths where NavBar should be displayed
  const showNavBarPaths = ["/", "/login", "/register"];
  const shouldShowNavBar = showNavBarPaths.includes(location.pathname);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  return (
    <>
      {shouldShowNavBar && (
        <NavBar
          onScroll={handleScroll}
          homeRef={homeRef}
          aboutRef={aboutRef}
          contactRef={contactRef}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/student-dashboard" />
            ) : adminLoggedIn ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <HomePage
                homeRef={homeRef}
                aboutRef={aboutRef}
                contactRef={contactRef}
              />
            )
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/student-dashboard" />
            ) : adminLoggedIn ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/student-dashboard" />
            ) : adminLoggedIn ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <RegisterPage />
            )
          }
        />

        <Route
          path="/student-dashboard"
          element={isLoggedIn ? <StudentDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/student-book"
          element={
            isLoggedIn ? (
              <StudentRequestAppointment />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/student-appointments"
          element={
            isLoggedIn ? <StudentAppointments /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            adminLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/approved"
          element={adminLoggedIn ? <Approved /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/declined"
          element={adminLoggedIn ? <Declined /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/pending"
          element={adminLoggedIn ? <Pending /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/calendar"
          element={adminLoggedIn ? <AdminCalendar /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
