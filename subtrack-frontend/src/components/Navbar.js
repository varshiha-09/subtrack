import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, isBankConnected }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1A202C",
        padding: "10px 20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#E2E8F0",
          margin: 0,
        }}
      >
        SubTrack
      </h1>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {!isLoggedIn && (
          <>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#63B3ED",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#63B3ED",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Register
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link
              to="/plaid-link"
              style={{
                textDecoration: "none",
                color: "#63B3ED",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Connect Bank
            </Link>
            {isBankConnected && (
              <>
                <Link
                  to="/transactions"
                  style={{
                    textDecoration: "none",
                    color: "#63B3ED",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Transactions
                </Link>
                <Link
                  to="/subscriptions"
                  style={{
                    textDecoration: "none",
                    color: "#63B3ED",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Subscriptions
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
