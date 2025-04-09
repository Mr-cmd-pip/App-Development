import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ScrollLayout />
          }
        />
        <Route path="/admin_dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
  
  function ScrollLayout() {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);
  
    const handleScroll = (ref) => {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  
    return (
      <>
        <NavBar
          onScroll={handleScroll}
          homeRef={homeRef}
          aboutRef={aboutRef}
          contactRef={contactRef}
        />
        <LandingPage
          homeRef={homeRef}
          aboutRef={aboutRef}
          contactRef={contactRef}
        />
      </>
    );
}

export default App;
