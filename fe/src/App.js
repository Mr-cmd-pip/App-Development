
import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Approved from "./pages/admin/AdminApproved";
import Declined from "./pages/admin/AdminDeclined";
import Pending from "./pages/admin/AdminPending";
import AdminCalendar from "./pages/admin/AdminCalendar";

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Router>
      <NavBar
        onScroll={handleScroll}
        homeRef={homeRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />
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
        <Route path='/admin_dashboard' element={<AdminDashboard />} />
        <Route path='/admin_approved' element={<Approved />} />
        <Route path='/admin_declined' element={<Declined />} />
        <Route path='/admin_pending' element={<Pending />} />
        <Route path='/admin_calendar' element={<AdminCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;
