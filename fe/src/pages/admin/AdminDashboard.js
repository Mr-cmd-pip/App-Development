import React from "react";
import "../../css/Sidebar.css";
import Sidebar from "../../components/SideBar";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

function AdminDashboard() {
  const stats = {
    users: 128,
    appointments: 35,
    approved: 20,
    declined: 5,
  };

  const cardData = [
    {
      label: "Users",
      count: stats.users,
      description: "Total Registered Users",
      icon: <GroupIcon />,
      iconBg: "#e3f2fd",
      color: "#1976d2",
      gradient: "linear-gradient(135deg, #bbdefb, #e3f2fd)",
    },
    {
      label: "Appointments",
      count: stats.appointments,
      description: "Pending & Scheduled",
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
      description: "Declined Requests",
      icon: <CancelIcon />,
      iconBg: "#ffebee",
      color: "#d32f2f",
      gradient: "linear-gradient(135deg, #ffcdd2, #ffebee)",
    },
  ];

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
