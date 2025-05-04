import React, { useState, useEffect } from "react";
import SideBarStudent from "../../components/SideBarStudent";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import axios from "axios";

const appointmentTypes = [
  "Course Withdrawal",
  "Course Change",
  "Enrollment Inquiry",
];

const StudentRequestAppointment = () => {
  const [form, setForm] = useState({
    courseId: "",
    courseName: "",
    department: "",
    appointmentType: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [dailyLimit, setDailyLimit] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  // Fetch daily limit and current appointments count
  useEffect(() => {
    const fetchDailyLimit = async () => {
      try {
        const limitRes = await axios.get(
          "http://localhost:8080/dailyLimit/get"
        );
        setDailyLimit(limitRes.data.dailyLimit); // Assuming it returns { dailyLimit: number }
      } catch (error) {
        console.log("Error fetching daily limit", error);
      }
    };

    const fetchAppointmentsCount = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/appointment/getAllAppointments"
        );
        const count = res.data.filter(
          (appointment) =>
            new Date(appointment.preferredDate).toLocaleDateString() ===
            new Date(form.preferredDate).toLocaleDateString()
        ).length;
        setAppointmentsCount(count);
      } catch (error) {
        console.log("Error fetching appointments count", error);
      }
    };

    if (form.preferredDate) {
      fetchAppointmentsCount();
    }

    fetchDailyLimit();
  }, [form.preferredDate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const user = JSON.parse(localStorage.getItem("student"));
    e.preventDefault();

    const isEmpty = Object.values(form).some(
      (value) => value === "" || value.trim() === ""
    );
    if (isEmpty) {
      setSnackbar({
        open: true,
        message: "Please fill in all the fields",
        severity: "error",
      });
      return;
    }

    const meetTime = new Date(`1970-01-01T${form.preferredTime}:00`);
    const preferredDate = new Date(form.preferredDate);
    const dayOfWeek = preferredDate.getUTCDay();

    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
    const isSaturday = dayOfWeek === 6;

    const isValidTime =
      (isWeekday &&
        meetTime >= new Date("1970-01-01T08:00:00") &&
        meetTime <= new Date("1970-01-01T16:30:00")) ||
      (isSaturday &&
        meetTime >= new Date("1970-01-01T08:00:00") &&
        meetTime <= new Date("1970-01-01T11:00:00"));

    if (dayOfWeek === 0 || !isValidTime) {
      setSnackbar({
        open: true,
        message: "Invalid meeting time. Please select a valid time and date.",
        severity: "error",
      });
      return;
    }

    setSnackbar({
      open: true,
      message: "Please wait, your appointment request is being processed",
      severity: "info",
    });

    // 🧠 Daily Limit Constraint Logic
    try {
      const [limitRes, appointmentsRes] = await Promise.all([
        axios.get("http://localhost:8080/dailyLimit/get"),
        axios.post("http://localhost:8080/api/appointment/getAllAppointments"),
      ]);

      const dailyLimit = limitRes.data[0]?.dailylimit || 10;
      const allAppointments = appointmentsRes.data;

      const sameDayAppointments = allAppointments.filter(
        (appointment) =>
          appointment.meetDate === form.preferredDate &&
          appointment.status.toLowerCase() !== "canceled"
      );

      if (sameDayAppointments.length >= dailyLimit) {
        setSnackbar({
          open: true,
          message: `Daily appointment limit (${dailyLimit}) reached for this date.`,
          severity: "error",
        });
        return;
      }
    } catch (err) {
      console.error("Error checking daily limit or appointments", err);
      setSnackbar({
        open: true,
        message: "Failed to validate daily limit. Try again later.",
        severity: "error",
      });
      return;
    }

    // ✅ Proceed with creating the appointment
    try {
      const res = await axios.post(
        "http://localhost:8080/api/appointment/insert",
        {
          meetDate: form.preferredDate,
          meetTime: form.preferredTime,
          courseName: form.courseName,
          status: "pending",
          studentId: user.studentId,
          department: form.department,
          courseId: form.courseId,
          notes: form.notes,
          type: form.appointmentType,
        }
      );

      if (res.status === 201) {
        setSnackbar({
          open: true,
          message: "Appointment Requested Successfully",
          severity: "success",
        });
        setForm({
          preferredDate: "",
          preferredTime: "",
          courseName: "",
          department: "",
          courseId: "",
          notes: "",
          appointmentType: "",
        });
      } else {
        setSnackbar({
          open: true,
          message: res.data.message,
          severity: "error",
        });
      }
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SideBarStudent />
      <Box flex={1} p={5} bgcolor="#f9fafb">
        <Paper elevation={3} sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Request an Appointment
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <TextField
                    label="Course ID"
                    name="courseId"
                    value={form.courseId}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Course Name"
                    name="courseName"
                    value={form.courseName}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Appointment Type"
                    name="appointmentType"
                    value={form.appointmentType}
                    onChange={handleChange}
                    select
                    fullWidth
                  >
                    {appointmentTypes.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <TextField
                    label="Preferred Date"
                    name="preferredDate"
                    type="date"
                    value={form.preferredDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    label="Preferred Time"
                    name="preferredTime"
                    type="time"
                    value={form.preferredTime}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    label="Additional Notes (optional)"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Stack>
              </Grid>

              {/* Submit Button - Full width */}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Submit Request
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default StudentRequestAppointment;
