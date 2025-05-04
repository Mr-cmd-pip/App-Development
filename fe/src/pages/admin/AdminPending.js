import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Sidebar from "../../components/SideBar";
import "../../css/Sidebar.css";

function AdminPending() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    meetDate: "",
    meetTime: "",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/appointment/getAllAppointments"
      );
      const pending = res.data.filter((item) => item.status === "pending");
      setAppointments(pending);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleData({
      meetDate: appointment.meetDate,
      meetTime: appointment.meetTime,
    });
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleApprove = async () => {
    if (!selectedAppointment) return;
    setActionLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/api/appointment/approveAppointment/${selectedAppointment.appointId}`
      );
      fetchAppointments();
      handleClose();
    } catch (err) {
      console.error("Error approving appointment:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDecline = async () => {
    if (!selectedAppointment) return;
    setActionLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/api/appointment/declineAppointment/${selectedAppointment.appointId}`
      );
      fetchAppointments();
      handleClose();
    } catch (err) {
      console.error("Error declining appointment:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReschedule = async () => {
    if (!selectedAppointment) return;
    setActionLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/api/appointment/rescheduleAppointment/${selectedAppointment.appointId}`,
        rescheduleData
      );
      fetchAppointments();
      handleClose();
    } catch (err) {
      console.error("Error rescheduling appointment:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Pending Appointments
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : appointments.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary" mt={4}>
            No pending appointments.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Meet Date</TableCell>
                  <TableCell>Meet Time</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((app) => (
                  <TableRow key={app.appointId}>
                    <TableCell>{app.appointId}</TableCell>
                    <TableCell>{app.meetDate}</TableCell>
                    <TableCell>{app.meetTime}</TableCell>
                    <TableCell>{app.courseName}</TableCell>
                    <TableCell>{app.type}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpen(app)}
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

        <Dialog open={modalOpen} onClose={handleClose}>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogContent dividers>
            {selectedAppointment && (
              <Box>
                <Typography>ID: {selectedAppointment.appointId}</Typography>
                <Typography>
                  Student ID: {selectedAppointment.studentId}
                </Typography>
                <Typography>
                  Department: {selectedAppointment.department}
                </Typography>
                <Typography>
                  Course: {selectedAppointment.courseName}
                </Typography>
                <Typography>Type: {selectedAppointment.type}</Typography>
                <Typography>Notes: {selectedAppointment.notes}</Typography>
                <TextField
                  label="Meet Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  value={rescheduleData.meetDate}
                  onChange={(e) =>
                    setRescheduleData({
                      ...rescheduleData,
                      meetDate: e.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Meet Time"
                  type="time"
                  fullWidth
                  margin="normal"
                  value={rescheduleData.meetTime}
                  onChange={(e) =>
                    setRescheduleData({
                      ...rescheduleData,
                      meetTime: e.target.value,
                    })
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleApprove} disabled={actionLoading}>
              {actionLoading ? "Approving..." : "Approve"}
            </Button>
            <Button onClick={handleDecline} disabled={actionLoading}>
              {actionLoading ? "Declining..." : "Decline"}
            </Button>
            <Button onClick={handleReschedule} disabled={actionLoading}>
              {actionLoading ? "Rescheduling..." : "Reschedule"}
            </Button>
            <Button onClick={handleClose} color="error">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AdminPending;
