
import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

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
        <Route path='/admin_dashboard' element={<AdminDashboard />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
