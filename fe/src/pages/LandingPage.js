import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { motion } from "motion/react";
import NavBar from "../components/NavBar";

function LandingPage({ homeRef, aboutRef, contactRef }) {

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <NavBar
        onScroll={handleScroll}
        homeRef={homeRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />
      {/* Hero Section */}
      <Box ref={homeRef} sx={styles.heroSection}>
        <Container maxWidth="md" sx={{ textAlign: "center", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            <Typography
              variant="h2"
              color="white"
              fontWeight="bold"
              gutterBottom
              sx={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                "@media (max-width: 410px)": {
                  fontSize: "3rem",
                },
              }}
            >
              University ETO Appointment System
            </Typography>
            <Typography variant="h5" color="white" paragraph>
              Book your appointments online and avoid long waiting times.
              Schedule efficiently and manage your time better.
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ backgroundColor: "gold", color: "maroon" }}
            >
              Book an Appointment
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* About Us Section */}
      <Box ref={aboutRef} sx={styles.section}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.9 } }}
          >
            <Typography
              variant="h3"
              color="maroon"
              fontWeight="bold"
              gutterBottom
            >
              About Us
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.9 } }}
          >
            <Typography variant="body1" color="text.secondary" paragraph>
              The ETO (Enrollment & Transactions Office) of the university
              ensures a smooth and hassle-free scheduling process. Our goal is
              to eliminate long queues by providing an efficient online
              appointment system.
            </Typography>
          </motion.div>

          {/* Cards with Motion Animations */}
          <Grid container spacing={3} justifyContent="center">
            {/* First Card */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0 },
                }}
              >
                <Card sx={styles.card}>
                  <CardContent>
                    <Typography variant="h6" color="maroon" fontWeight="bold">
                      Efficient Scheduling
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage your appointments seamlessly with our user-friendly
                      platform.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Second Card (Delayed Animation) */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.2 },
                }}
              >
                <Card sx={styles.card}>
                  <CardContent>
                    <Typography variant="h6" color="maroon" fontWeight="bold">
                      Hassle-Free Transactions
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Say goodbye to long queues and delays with our online
                      system.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Third Card (More Delay) */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.4 },
                }}
              >
                <Card sx={styles.card}>
                  <CardContent>
                    <Typography variant="h6" color="maroon" fontWeight="bold">
                      Secure & Reliable
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your data and appointments are kept safe with our advanced
                      security measures.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Divider />
      {/* Contact Us Section */}
      <Box ref={contactRef} sx={styles.section}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          >
            <Typography
              variant="h3"
              color="maroon"
              fontWeight="bold"
              gutterBottom
            >
              Contact Us
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          >
            <Typography variant="body1" color="text.secondary" paragraph>
              Need assistance? Reach out to us through our official email or
              contact number.
            </Typography>
          </motion.div>
          <Typography variant="body1" color="text.secondary" paragraph>
            📧 Email: support@universityeto.edu
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ☎ Phone: (123) 456-7890
          </Typography>
        </Container>
      </Box>
    </div>
  );
}

const styles = {
  heroSection: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,rgb(113, 23, 23),rgb(48, 10, 10))",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      right: "-9%",
      top: "50%",
      transform: "translateY(-50%)",
      width: "900px",
      height: "900px",
      backgroundImage: "url('/images/citlogo.png')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      opacity: 0.2, // Adjust for transparency effect
    },
  },
  section: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    padding: "4rem 0",
  },
  card: {
    padding: "1.5rem",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    height: "200px", // Ensures uniform card height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export default LandingPage;
