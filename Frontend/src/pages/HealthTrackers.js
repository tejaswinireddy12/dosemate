import React from "react";
import "./HealthTrackers.css";

function HealthTrackers() {
  return (
    <div className="healthtrackers-container">
      <h1>Health Tracking Dashboard</h1>
      <div className="tracker-grid">
        <div className="tracker-card">
          <h2>Daily Steps</h2>
          <p>🚶‍♂️ 7,500 / 10,000</p>
        </div>
        <div className="tracker-card">
          <h2>Water Intake</h2>
          <p>💧 1.5L / 2L</p>
        </div>
        <div className="tracker-card">
          <h2>Sleep</h2>
          <p>😴 6 hrs / 8 hrs</p>
        </div>
      </div>
    </div>
  );
}

export default HealthTrackers;
