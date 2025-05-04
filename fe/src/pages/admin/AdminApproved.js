import React, { useEffect, useState } from "react";
import "../../css/Sidebar.css";
import Sidebar from "../../components/SideBar";
import {
  Box,
  Typography,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
} from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import axios from "axios";

function AdminApproved() {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("today");

  const getTodayDateStr = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // returns YYYY-MM-DD
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${getMonthName(month)} ${parseInt(day)}`;
  };

  const getMonthName = (month) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[parseInt(month, 10) - 1];
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8080/api/appointment/getAllAppointments"
        );
        const approved = response.data.filter(
          (app) => app.status === "approved"
        );
        setAppointments(approved);
        filterAppointments(approved, "today");
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filterAppointments = (data, type) => {
    const today = getTodayDateStr();
    let result = [];

    if (type === "today") {
      result = data.filter((a) => a.meetDate === today);
    } else if (type === "past") {
      result = data.filter((a) => a.meetDate < today);
    } else if (type === "upcoming") {
      result = data.filter((a) => a.meetDate > today);
    }

    setFiltered(result);
  };

  const handleViewChange = (_, newView) => {
    if (newView) {
      setView(newView);
      filterAppointments(appointments, newView);
    }
  };

  return (
    <div className="approved" style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#f0f2f5" }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Approved Appointments
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
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : filtered.length === 0 ? (
          <Typography>No approved appointments for selected view.</Typography>
        ) : (
          <Grid container spacing={3}>
            {filtered.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #c8e6c9, #e8f5e9)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#e8f5e9",
                      p: 1.5,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircleIcon sx={{ color: "#388e3c", fontSize: 36 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Student ID: {card.studentId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Approved on {formatDate(card.meetDate)} @ {card.meetTime}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontStyle="italic"
                    >
                      Type: {card.type}
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

export default AdminApproved;
