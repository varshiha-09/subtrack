import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { createLinkToken, exchangePublicToken } from "../plaidService";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const PlaidLinkComponent = ({ userId, onAccessTokenRetrieved, setIsBankConnected }) => {
  const [linkToken, setLinkToken] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const token = await createLinkToken(userId);
        setLinkToken(token);
      } catch (error) {
        console.error("Error creating link token:", error.message);
      }
    };
    fetchLinkToken();
  }, [userId]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (publicToken) => {
      try {
        const { access_token } = await exchangePublicToken(publicToken);
        onAccessTokenRetrieved(access_token);
        setIsBankConnected(true);
        setIsConnected(true);
      } catch (error) {
        console.error("Error exchanging public token:", error.message);
      }
    },
  });

  return (
    <Box
      sx={{
        marginTop: "80px", // Adjust to the height of your navbar
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 80px)", // Adjust based on the navbar height
      }}
    >
      <Card
        style={{
          margin: "20px auto",
          maxWidth: "500px",
          textAlign: "center",
          background: "rgba(45, 55, 72, 0.95)",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.7)",
          borderRadius: "12px",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom style={{ color: "#E2E8F0" }}>
            Connect Your Bank
          </Typography>
          {isConnected ? (
            <Typography variant="body1" color="green">
              You are connected to the bank! Transactions and Subscriptions pages are now available.
            </Typography>
          ) : (
            <Button
              variant="contained"
              style={{
                background: "linear-gradient(90deg, #4299E1, #63B3ED)",
                color: "#FFFFFF",
              }}
              onClick={() => open()}
              disabled={!ready}
            >
              Link Account
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlaidLinkComponent;
