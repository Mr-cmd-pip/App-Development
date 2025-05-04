import React, { useEffect, useState } from "react";
import "../../css/Sidebar.css";
import Sidebar from "../../components/SideBar";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Cancel as CancelIcon } from "@mui/icons-material";

function AdminDeclined() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("today");

  useEffect(() => {
    fetch("http://localhost:8080/api/appointment/getAllAppointments", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        const declined = data.filter((a) => a.status === "declined");
        setAppointments(declined);
      })
      .catch((err) => console.error("Failed to fetch appointments", err))
      .finally(() => setLoading(false));
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  };

  const today = getTodayDate();

  const filteredAppointments = appointments.filter((appt) => {
    if (view === "today") return appt.meetDate === today;
    if (view === "past") return appt.meetDate < today;
    if (view === "upcoming") return appt.meetDate > today;
    return true;
  });

  const handleViewChange = (_, newView) => {
    if (newView) {
      setView(newView);
    }
  };

  return (
    <div className="declined" style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#f0f2f5" }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Declined Appointments
        </Typography>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          sx={{ mb: 3 }}
        >
          <ToggleButton value="today">Today</ToggleButton>
          <ToggleButton value="past">Previous</ToggleButton>
          <ToggleButton value="upcoming">Upcoming</ToggleButton>
        </ToggleButtonGroup>

        {loading ? (
          <CircularProgress />
        ) : filteredAppointments.length === 0 ? (
          <Typography>No declined appointments found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredAppointments.map((appt, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #ffcdd2, #ffebee)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#ffebee",
                      p: 1.5,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CancelIcon sx={{ color: "#d32f2f", fontSize: 36 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {appt.studentId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(appt.meetDate)} @ {appt.meetTime}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontStyle="italic"
                    >
                      Type: {appt.type}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
}

export default AdminDeclined;
