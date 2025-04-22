import { useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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
            <HomePage
              homeRef={homeRef}
              aboutRef={aboutRef}
              contactRef={contactRef}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-book" element={<StudentRequestAppointment />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/approved" element={<Approved />} />
        <Route path="/admin/declined" element={<Declined />} />
        <Route path="/admin/pending" element={<Pending />} />
        <Route path="/admin/calendar" element={<AdminCalendar />} />
      </Routes>
    </>
  );
}

export default App;
