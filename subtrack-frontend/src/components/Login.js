import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { loginUser } from "../services/authService";

const Login = ({ setUserId, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null); // Clear previous errors
      const { userId } = await loginUser(email, password);
      setUserId(userId); // Save userId to the parent component
      setIsLoggedIn(true); // Set logged-in state
      navigate("/plaid-link"); // Redirect to PlaidLink page
    } catch (err) {
      setError(err.message);
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
            Login
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
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
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              marginTop: 2,
              background: "linear-gradient(90deg, #4299E1, #63B3ED)",
              "&:hover": {
                background: "linear-gradient(90deg, #3182CE, #4299E1)",
              },
            }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
