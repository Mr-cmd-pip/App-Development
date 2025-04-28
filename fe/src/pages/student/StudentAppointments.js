import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Modal,
  Typography,
  Button,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import SideBarStudent from "../../components/SideBarStudent";

const StudentAppointments = () => {
  const user = JSON.parse(localStorage.getItem("student"));
  const studentId = user?.studentId;
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (studentId) {
      fetchAppointments();
    }
  }, [studentId]);

  useEffect(() => {
    const filtered = appointments.filter(
      (appt) => appt.status.toLowerCase() === selectedStatus
    );
    setFilteredAppointments(filtered);
  }, [appointments, selectedStatus]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/appointment/getAllAppointmentOfStudent/${studentId}`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to fetch appointments.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (event, newValue) => {
    setSelectedStatus(newValue);
  };

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  const cancelAppointment = async (appointId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/appointment/cancelAppointment/${appointId}`
      );
      setSnackbarSeverity("success");
      setSnackbarMessage("Appointment canceled successfully.");
      fetchAppointments();
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to cancel appointment.");
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <SideBarStudent />
      <Box p={4} flex={1}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2e3b55" }}
        >
          Your Appointments
        </Typography>

        <Tabs
          value={selectedStatus}
          onChange={handleStatusChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 2 }}
        >
          <Tab label="Pending" value="pending" />
          <Tab label="Canceled" value="canceled" />
          <Tab label="Completed" value="completed" />
          <Tab label="Declined" value="declined" />
        </Tabs>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress color="primary" />
          </Box>
        ) : filteredAppointments.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              mt: 5,
              textAlign: "center",
              color: "#888",
              fontStyle: "italic",
            }}
          >
            No {selectedStatus} appointments to show.
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ mt: 2, borderRadius: 2, boxShadow: 3 }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Time</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Course</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Type</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAppointments.map((appt) => (
                  <TableRow key={appt.appointId} hover>
                    <TableCell>{appt.meetDate}</TableCell>
                    <TableCell>{appt.meetTime}</TableCell>
                    <TableCell>{appt.courseName}</TableCell>
                    <TableCell>{appt.type}</TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {appt.status}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenModal(appt)}
                        sx={{
                          transition: "0.3s",
                          borderColor: "#1976d2",
                          color: "#1976d2",
                          "&:hover": {
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          },
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Appointment Details Modal */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 4,
              boxShadow: 10,
              width: 450,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {selectedAppointment && (
              <>
                <Typography
                  variant="h5"
                  sx={{ mb: 2, fontWeight: "bold", color: "#2e3b55" }}
                >
                  Appointment Details
                </Typography>

                <Box mb={2}>
                  <Typography variant="subtitle2" color="text.secondary">
                    General Info
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography>
                    <strong>Date:</strong> {selectedAppointment.meetDate}
                  </Typography>
                  <Typography>
                    <strong>Time:</strong> {selectedAppointment.meetTime}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {selectedAppointment.status}
                  </Typography>
                </Box>

                <Box mb={2}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Course Info
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography>
                    <strong>Course:</strong> {selectedAppointment.courseName}
                  </Typography>
                  <Typography>
                    <strong>Type:</strong> {selectedAppointment.type}
                  </Typography>
                  <Typography>
                    <strong>Course ID:</strong> {selectedAppointment.courseId}
                  </Typography>
                  <Typography>
                    <strong>Department:</strong>{" "}
                    {selectedAppointment.department}
                  </Typography>
                </Box>

                {selectedAppointment.notes && (
                  <Box mb={2}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Notes
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography>{selectedAppointment.notes}</Typography>
                  </Box>
                )}

                {selectedAppointment.status === "pending" && (
                  <Box mt={3} textAlign="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        cancelAppointment(selectedAppointment.appointId);
                        handleCloseModal();
                      }}
                      sx={{ borderRadius: 2, px: 3 }}
                    >
                      Cancel Appointment
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Modal>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={snackbarSeverity}
            onClose={() => setSnackbarOpen(false)}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default StudentAppointments;
