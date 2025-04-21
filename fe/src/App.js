import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  
  return (
    <Router>
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
        <Route 
          path="/login" 
          element={
            <Login />} 
        />
        <Route 
          path="/register" 
          element={
            <RegisterPage />} 
        />
        <Route 
          path='/admin/dashboard' 
          element={
            <AdminDashboard />}  
        />
        <Route 
          path='/admin/approved' 
          element={
            <Approved />} 
        />
        <Route 
          path='/admin/declined' 
          element={<Declined />} 
        />
        <Route 
          path='/admin/pending' 
          element={
            <Pending />} 
        />
        <Route 
          path='/admin/calendar' 
          element={<AdminCalendar />} 
          />
      </Routes>
    </Router>
  );
}

export default App;
