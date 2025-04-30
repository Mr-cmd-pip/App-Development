import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "motion/react";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("student"); // "student" or "admin"

  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errorMsg = emailRegex.test(value) ? "" : "Invalid email format";
    }
    if (name === "password") {
      errorMsg = validatePassword(value);
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

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleUserTypeChange = (_, newType) => {
    if (newType !== null) setUserType(newType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !Object.values(errors).some((error) => error) &&
      Object.values(form).every((val) => val)
    ) {
      const apiUrl =
        userType === "admin"
          ? "http://localhost:8080/api/admins/login"
          : "http://localhost:8080/api/student/login";

      try {
        const res = await axios.post(apiUrl, {
          email: form.email,
          password: form.password,
        });

        if (res.status === 200) {
          if (userType === "admin") {
            localStorage.setItem("admin", JSON.stringify(res.data));
            localStorage.setItem("adminLoggedIn", true);
            setSnackbar({
              open: true,
              message: "Admin login successful",
              severity: "success",
            });
            navigate("/admin/dashboard");
          } else {
            localStorage.setItem("student", JSON.stringify(res.data));
            localStorage.setItem("isLoggedIn", true);
            setSnackbar({
              open: true,
              message: "Student login successful",
              severity: "success",
            });
            navigate("/student-dashboard");
          }
        } else {
          setSnackbar({
            open: true,
            message: "Login Failed",
            severity: "error",
          });
        }
      } catch (error) {
        console.error(error);
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Login error",
          severity: "error",
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: "Please input all fields correctly",
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
            Login Account
          </Typography>

          <ToggleButtonGroup
            color="primary"
            value={userType}
            exclusive
            onChange={handleUserTypeChange}
            fullWidth
            sx={{ mt: 2, mb: 3 }}
          >
            <ToggleButton value="student">Student</ToggleButton>
            <ToggleButton value="admin">Admin</ToggleButton>
          </ToggleButtonGroup>

          <form onSubmit={handleSubmit}>
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
              Login
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

export default LoginPage;
