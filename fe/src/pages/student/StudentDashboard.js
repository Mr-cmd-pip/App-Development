import React from "react";
import SideBarStudent from "../../components/SideBarStudent";
import StudentDashboardContent from "../../components/StudentDashboardContent"; // Adjust path accordingly

const StudentDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideBarStudent />
      <StudentDashboardContent />
    </div>
  );
};

export default StudentDashboard;
