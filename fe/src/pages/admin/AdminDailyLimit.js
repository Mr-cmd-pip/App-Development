import React, { useEffect, useState } from "react";
import "../../css/Sidebar.css";
import Sidebar from "../../components/SideBar";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
  AddCircle as AddCircleIcon,
} from "@mui/icons-material";

const AdminDailyLimit = () => {
  const [dailyLimit, setDailyLimit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newLimit, setNewLimit] = useState("");
  const [canInsert, setCanInsert] = useState(false);

  // Fetch the daily limit when the component mounts
  useEffect(() => {
    fetch("http://localhost:8080/dailyLimit/get")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setDailyLimit(data[0]);
        } else {
          setCanInsert(true); // If no records, allow insertion
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching daily limit:", error);
        setLoading(false);
      });
  }, []);

  // Handle the PUT request to update the daily limit
  const handleUpdateLimit = () => {
    if (!newLimit) return;

    const updatedLimit = { dailylimit: newLimit };

    fetch(
      `http://localhost:8080/dailyLimit/update/${dailyLimit.dailylimitid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLimit),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDailyLimit(data);
        setEditMode(false); // Exit edit mode after successful update
      })
      .catch((error) => {
        console.error("Error updating daily limit:", error);
      });
  };

  // Handle the POST request to insert a new daily limit if none exists
  const handleInsertLimit = () => {
    if (!newLimit) return;

    const newLimitData = { dailylimit: newLimit };

    fetch("http://localhost:8080/dailyLimit/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLimitData),
    })
      .then((response) => response.json())
      .then((data) => {
        setDailyLimit(data);
        setCanInsert(false); // Disable insertion once a limit is created
      })
      .catch((error) => {
        console.error("Error inserting daily limit:", error);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: "#f0f2f5",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Daily Limit Management
        </Typography>

        <Paper
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#fff",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          {dailyLimit ? (
            <>
              <Typography
                variant="h1"
                gutterBottom
                fontWeight={700}
                sx={{ fontSize: "6rem", color: "#388e3c" }}
              >
                {dailyLimit.dailylimit}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                This is the appointment daily limit
              </Typography>

              {editMode ? (
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="New Daily Limit"
                      type="number"
                      value={newLimit}
                      onChange={(e) => setNewLimit(e.target.value)}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <Box display="flex" justifyContent="center" gap={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateLimit}
                        startIcon={<SaveIcon />}
                        sx={{ width: "150px" }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditMode(false)}
                        startIcon={<CancelIcon />}
                        sx={{ width: "150px" }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setEditMode(true)}
                  startIcon={<EditIcon />}
                  sx={{
                    mt: 2,
                    backgroundColor: "#388e3c",
                    "&:hover": {
                      backgroundColor: "#2c6f2d",
                    },
                  }}
                >
                  Edit Daily Limit
                </Button>
              )}
            </>
          ) : canInsert ? (
            <>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
                No daily limit set yet.
              </Typography>
              <TextField
                label="New Daily Limit"
                type="number"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleInsertLimit}
                startIcon={<AddCircleIcon />}
                sx={{
                  width: "200px",
                  backgroundColor: "#388e3c",
                  "&:hover": {
                    backgroundColor: "#2c6f2d",
                  },
                }}
              >
                Insert Daily Limit
              </Button>
            </>
          ) : (
            <Typography variant="h6" color="text.secondary">
              The daily limit has already been set.
            </Typography>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default AdminDailyLimit;
