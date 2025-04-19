import React, { useState } from "react";
import SideBarStudent from "../../components/SideBarStudent";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Paper,
  Grid,
  Stack,
} from "@mui/material";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Appointment:", form);
    // TODO: Handle submission logic (e.g., API call)
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
    </div>
  );
};

export default StudentRequestAppointment;
