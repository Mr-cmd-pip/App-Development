import React, { useEffect, useState } from "react";
import "../../css/Sidebar.css";
import Sidebar from "../../components/SideBar";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

function AdminDashboard() {
  const [stats, setStats] = useState({
    appointments: 0,
    approved: 0,
    declined: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch appointments and update stats using POST method
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/appointment/getAllAppointments",
          {
            method: "POST", // Use POST method
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();

        // Categorize appointments
        const appointmentStats = data.reduce(
          (acc, appointment) => {
            if (appointment.status === "approved") acc.approved++;
            else if (appointment.status === "declined") acc.declined++;
            else if (appointment.status === "pending") acc.pending++;
            acc.appointments++; // Total appointments
            return acc;
          },
          { appointments: 0, approved: 0, declined: 0, pending: 0 }
        );

        setStats(appointmentStats);
        setLoading(false); // Stop loading when the data is fetched
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const cardData = [
    {
      label: "Appointments",
      count: stats.appointments,
      description: "Total Appointments (Pending, Approved, Declined)",
      icon: <ScheduleIcon />,
      iconBg: "#fff3e0",
      color: "#fb8c00",
      gradient: "linear-gradient(135deg, #ffe0b2, #fff3e0)",
    },
    {
      label: "Approved",
      count: stats.approved,
      description: "Approved Appointments",
      icon: <CheckCircleIcon />,
      iconBg: "#e8f5e9",
      color: "#388e3c",
      gradient: "linear-gradient(135deg, #c8e6c9, #e8f5e9)",
    },
    {
      label: "Declined",
      count: stats.declined,
      description: "Declined Appointments",
      icon: <CancelIcon />,
      iconBg: "#ffebee",
      color: "#d32f2f",
      gradient: "linear-gradient(135deg, #ffcdd2, #ffebee)",
    },
    {
      label: "Pending",
      count: stats.pending,
      description: "Pending Appointments",
      icon: <ScheduleIcon />,
      iconBg: "#e3f2fd",
      color: "#1976d2",
      gradient: "linear-gradient(135deg, #bbdefb, #e3f2fd)",
    },
  ];

  if (loading) {
    return (
      <Typography variant="h6" color="text.secondary">
        Loading...
      </Typography>
    );
  }

  return (
    <div className="dashboard" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#f0f2f5" }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 4,
                  background: card.gradient,
                  transition: "transform 0.3s ease",
                  height: "100%", // Ensure the boxes have the same height
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: card.iconBg,
                    p: 1.5,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 50, // Set a fixed width for the icon container
                    height: 50, // Set a fixed height for the icon container
                  }}
                >
                  {React.cloneElement(card.icon, {
                    style: { color: card.color, fontSize: 36 },
                  })}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {card.label}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {card.count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default AdminDashboard;
