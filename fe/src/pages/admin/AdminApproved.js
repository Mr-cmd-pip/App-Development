import React from "react";
import "../../css/Sidebar.css";
import Sidebar from "../../components/SideBar";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";

function AdminApproved() {
  const studentIds = [
    "24-2347-832",
    "25-5641-263",
    "29-4998-509",
    "32-8206-765",
  ];

  const cardData = studentIds.map((id) => ({
    label: id,
    description: "Approved",
    icon: <CheckCircleIcon />,
    iconBg: "#e8f5e9",
    color: "#388e3c",
    gradient: "linear-gradient(135deg, #c8e6c9, #e8f5e9)",
  }));

  return (
    <div className="approved" style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#f0f2f5" }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Approved Appointments
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

export default AdminApproved;
