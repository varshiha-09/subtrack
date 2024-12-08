import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PlaidLinkComponent from './components/PlaidLink';
import Transactions from './components/Transactions';
import SubscriptionList from './components/SubscriptionList';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBankConnected, setIsBankConnected] = useState(false);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} isBankConnected={isBankConnected} />
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <Login setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/plaid-link" />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/plaid-link"
          element={
            isLoggedIn ? (
              <PlaidLinkComponent userId={userId} onAccessTokenRetrieved={setAccessToken} setIsBankConnected={setIsBankConnected} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/transactions"
          element={
            isBankConnected ? <Transactions userId={userId} accessToken={accessToken} /> : <Navigate to="/plaid-link" />
          }
        />
        <Route
          path="/subscriptions"
          element={
            isBankConnected ? <SubscriptionList userId={userId} /> : <Navigate to="/plaid-link" />
          }
        />
      </Routes>
    </div>
  );
};


export default App;
