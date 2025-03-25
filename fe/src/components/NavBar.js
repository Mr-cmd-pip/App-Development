import { AppBar, Toolbar, Button, Box } from "@mui/material";

function NavBar({ onScroll, homeRef, aboutRef, contactRef }) {
  return (
    <AppBar position="fixed" sx={{ background: "#333" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" onClick={() => onScroll(homeRef)}>
            Home
          </Button>
          <Button color="inherit" onClick={() => onScroll(aboutRef)}>
            About Us
          </Button>
          <Button color="inherit" onClick={() => onScroll(contactRef)}>
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
