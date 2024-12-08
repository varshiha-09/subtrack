import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";

const SubscriptionList = ({ userId }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/subscriptions/${userId}`
        );
        if (response.data && response.data.subscriptions) {
          setSubscriptions(response.data.subscriptions);
        } else {
          setError("No subscriptions found.");
        }
      } catch (err) {
        setError("Failed to load subscriptions.");
      }
    };

    fetchSubscriptions();
  }, [userId]);

  const sendEmail = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5001/api/subscriptions/send_email/${userId}`
      );
      setEmailStatus(response.data.message || "Email sent successfully!");
    } catch (err) {
      setEmailStatus(
        err.response?.data?.error || "Failed to send email. Please try again."
      );
    }
  };

  if (error) {
    return (
      <Box
        sx={{
          color: "#F56565",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        {error}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: "0 auto",
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "rgba(45, 55, 72, 0.9)",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        marginTop: "80px",
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#E2E8F0",
          marginBottom: "15px", // Add some margin below the text
        }}
      >
        Your Subscriptions
      </Typography>
      <Button
        onClick={sendEmail}
        sx={{
          backgroundColor: "#2B6CB0",
          color: "#E2E8F0",
          padding: "8px 15px",
          fontSize: "14px",
          textTransform: "capitalize",
          borderRadius: "5px",
          marginBottom: "20px", // Add some margin below the button
          "&:hover": {
            backgroundColor: "#2C5282",
          },
        }}
      >
        Send Email
      </Button>
      {emailStatus && (
        <Typography
          sx={{
            color: emailStatus.includes("successfully")
              ? "#38A169"
              : "#E53E3E",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          {emailStatus}
        </Typography>
      )}
      {subscriptions.length === 0 ? (
        <Typography
          sx={{
            color: "#CBD5E0",
            textAlign: "center",
          }}
        >
          No subscriptions found.
        </Typography>
      ) : (
        subscriptions.map((sub, index) => (
          <Box
            key={sub._id || index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "15px",
              padding: "15px",
              backgroundColor: "rgba(26, 32, 44, 1)",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#E2E8F0",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {sub.name}
              </Typography>
              <Typography
                sx={{
                  color: "#A0AEC0",
                  fontSize: "16px",
                }}
              >
                Amount: ${sub.amount}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "right",
              }}
            >
              <Typography
                sx={{
                  color: "#A0AEC0",
                  fontSize: "14px",
                }}
              >
                Last Payment:{" "}
                {new Date(sub.lastPaymentDate).toLocaleDateString()}
              </Typography>
              <Typography
                sx={{
                  color: "#A0AEC0",
                  fontSize: "14px",
                }}
              >
                Next Payment:{" "}
                {new Date(sub.nextPaymentDate).toLocaleDateString()}
              </Typography>
              <a
                href={sub.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#63B3ED",
                  textDecoration: "none",
                  fontSize: "14px",
                  marginTop: "10px",
                }}
              >
                Manage Subscription
              </a>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default SubscriptionList;
