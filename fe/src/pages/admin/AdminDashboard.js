import React from "react";
import "../../css/Sidebar.css";
import Sidebar from "../../components/SideBar";
import StatCards from "../../components/StatCards";

function AdminDashboard() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <StatCards />
        <h1>Hello from Dashboard</h1>
      </div>
    </div>
  );
}

export default AdminDashboard;
