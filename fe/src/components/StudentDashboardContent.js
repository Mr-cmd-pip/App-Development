import React from "react";
import { Box, Typography, Paper, Grid, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
const features = [
  {
    icon: "📅",
    title: "Book a new appointment",
    description: "Schedule a meeting with the ETO Office",
    path: "/student-book",
  },
  {
    icon: "📂",
    title: "Manage Appointments",
    description: "Check and manage your appointments",
  },
  {
    icon: "❓",
    title: "Get help or contact",
    description: "Reach out for assistance",
  },
];

const StudentDashboardContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flex: 1,
        p: 5,
        bgcolor: "#f9fafb",
        borderRadius: "20px 0 0 0",
        // minHeight: "100vh",
      }}
    >
      {/* Welcome Section */}
      <Box mb={4} pb={3} borderBottom="1px solid #e5e7eb">
        <Typography variant="h4" fontWeight="bold" color="primary.dark" mb={1}>
          Welcome to the ETO Appointment Portal
        </Typography>
        <Typography color="text.secondary" maxWidth={700}>
          This is your student dashboard where you can manage all your
          appointments with the Enrollment Technical Office.
        </Typography>
      </Box>

      {/* Features Section */}
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" color="primary" mb={3}>
          What you can do:
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper
                onClick={() => navigate(feature.path)}
                elevation={2}
                sx={{
                  p: 3,
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Typography fontSize="2rem">{feature.icon}</Typography>
                <Box>
                  <Typography fontWeight="bold" color="primary.dark">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Call to Action */}
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.main",
          background: "linear-gradient(135deg, #2563eb, #1e40af)",
        }}
      >
        <Box>
          <Typography variant="h6" color="common.white" mb={0.5}>
            Ready to schedule your appointment?
          </Typography>
          <Typography color="rgba(255, 255, 255, 0.9)">
            Click the button to book your meeting with the ETO Office.
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "primary.dark",
            fontWeight: "bold",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 4,
            },
          }}
          onClick={() => navigate("/student-book")}
        >
          Book Appointment
        </Button>
      </Box>
    </Box>
  );
};

export default StudentDashboardContent;
