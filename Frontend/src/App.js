import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import Reminders from "./pages/Reminders";
import SOS from "./pages/SOS";
import Appointments from "./pages/Appointments";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import "./Log.css";

// Private Route Component
const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Dashboard = () => <div><h2>Welcome to your Dashboard</h2></div>;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/reminders"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Reminders />
              </PrivateRoute>
            }
          />
          <Route
            path="/SOS"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <SOS />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Appointments />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      {isAuthenticated && <Chatbot />}
      {isAuthenticated && <Footer />}
    </div>
  );
}

export default App;
