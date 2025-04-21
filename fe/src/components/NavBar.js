import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function NavBar({ onScroll, homeRef, aboutRef, contactRef }) {
  const navigateTo = useNavigate();
  const currentPage = useLocation();
  return (
    <AppBar position="sticky" sx={{ background: "#333" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => {
              if (currentPage.pathname === "/") {
                onScroll(homeRef);
              } else {
                navigateTo("/");
              }
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              if (currentPage.pathname === "/") {
                onScroll(aboutRef);
              } else {
                navigateTo("/");
              }
            }}
          >
            About Us
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              if (currentPage.pathname === "/") {
                onScroll(contactRef);
              } else {
                navigateTo("/");
              }
            }}
          >
            Contact Us
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button sx={{ bgcolor: "inherit", color: "white" }}
          onClick={() => navigateTo("/login")}>Login</Button>
          <Button sx={{ bgcolor: "gold", color: "maroon" }}
          onClick={() => navigateTo("/register")}>Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;