import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/auth/register", {
        email,
        password,
      });

      setError("");
      setSuccess("Registration successful! You can now log in.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #2D3748, #1A202C)",
        padding: "20px",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "rgba(45, 55, 72, 0.95)",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.7)",
          borderRadius: 3,
          padding: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#E2E8F0", fontWeight: "bold" }}
          >
            Register
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success" align="center" sx={{ mb: 2 }}>
              {success}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Enter your email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: "#E2E8F0" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#63B3ED",
                },
                "&:hover fieldset": {
                  borderColor: "#4299E1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3182CE",
                },
              },
            }}
          />
          <TextField
            fullWidth
            type="password"
            label="Enter your password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#E2E8F0" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#63B3ED",
                },
                "&:hover fieldset": {
                  borderColor: "#4299E1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3182CE",
                },
              },
            }}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "#E2E8F0" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#63B3ED",
                },
                "&:hover fieldset": {
                  borderColor: "#4299E1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3182CE",
                },
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleRegister}
            sx={{
              marginTop: 2,
              background: "linear-gradient(90deg, #4299E1, #63B3ED)",
              "&:hover": {
                background: "linear-gradient(90deg, #3182CE, #4299E1)",
              },
            }}
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
