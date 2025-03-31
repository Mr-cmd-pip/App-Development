import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "motion/react";

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errorMsg = emailRegex.test(value) ? "" : "Invalid email format";
    }
    if (name === "password") {
      errorMsg = validatePassword(value);
    }
    if (name === "confirmPassword") {
      errorMsg = value !== form.password ? "Passwords do not match" : "";
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpper = /[A-Z]/;
    const hasLower = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password))
      return "Password must be at least 8 characters long";
    if (!hasUpper.test(password))
      return "Password must contain an uppercase letter";
    if (!hasLower.test(password))
      return "Password must contain a lowercase letter";
    if (!hasNumber.test(password)) return "Password must contain a number";
    if (!hasSpecial.test(password))
      return "Password must contain a special character";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !Object.values(errors).some((error) => error) &&
      Object.values(form).every((val) => val)
    ) {
      console.table("Form Data:", form);
      setSnackbar({
        open: true,
        message: "Registration Successful",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please input all fields",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg,rgb(113, 23, 23),rgb(48, 10, 10))",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      >
        <Box
          mt={8}
          p={4}
          boxShadow={3}
          borderRadius={2}
          width="400px"
          sx={{ backgroundColor: "white" }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "maroon" }}
          >
            Register Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastname"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              margin="normal"
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                mt: 2,
                p: "0.9rem",
                backgroundColor: "gold",
                color: "maroon",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </form>
        </Box>
      </motion.div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterPage;
