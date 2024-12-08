import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { getTransactions } from "../plaidService";

const Transactions = ({ accessToken, userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(accessToken, userId);
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err.message);
        setError("Failed to fetch transactions. Please try again.");
      }
    };

    fetchTransactions();
  }, [accessToken, userId]);

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

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

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
          marginBottom: "20px",
        }}
      >
        All Transactions
      </Typography>
      {transactions.length === 0 ? (
        <Typography
          sx={{
            color: "#CBD5E0",
            textAlign: "center",
          }}
        >
          No transactions found.
        </Typography>
      ) : (
        <>
          {currentTransactions.map((transaction) => (
            <Box
              key={transaction.transactionId}
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
                  {transaction.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#A0AEC0",
                    fontSize: "16px",
                  }}
                >
                  Amount: ${transaction.amount}
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
                  Date: {new Date(transaction.date).toLocaleDateString()}
                </Typography>
                <Typography
                  sx={{
                    color: "#A0AEC0",
                    fontSize: "14px",
                  }}
                >
                  Category:{" "}
                  {transaction.category?.join(", ") || "Uncategorized"}
                </Typography>
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Typography
              sx={{
                color: "#CBD5E0",
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "10px", // Adds spacing between text and buttons
              }}
            >
              Page {currentPage} of {totalPages}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                sx={{
                  backgroundColor: "#2D3748",
                  color: "#E2E8F0",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#4A5568",
                  },
                  "&:disabled": {
                    backgroundColor: "#4A5568",
                    color: "#A0AEC0",
                  },
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                sx={{
                  backgroundColor: "#2D3748",
                  color: "#E2E8F0",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#4A5568",
                  },
                  "&:disabled": {
                    backgroundColor: "#4A5568",
                    color: "#A0AEC0",
                  },
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Transactions;
