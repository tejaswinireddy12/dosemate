import React, { useState } from "react";
import "./SOS.css";

function SOS() {
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState(null);

  const handleSendAlert = () => {
    if (!contact || !message) {
      alert("Please fill in all fields!");
      return;
    }

    // Simulate sending an alert
    alert(`SOS Alert sent to ${contact} with message: "${message}"${location ? ` Location: ${location}` : ""}`);
  };

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(`Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`);
      },
      () => {
        alert("Unable to fetch location.");
      }
    );
  };

  return (
    <div className="sos-container">
      <h1>SOS Alert</h1>
      <p>In case of an emergency, use this page to alert your contacts.</p>
      <div className="form-group">
        <label htmlFor="contact">Emergency Contact</label>
        <input
          type="text"
          id="contact"
          placeholder="Enter contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          placeholder="Enter your emergency message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button onClick={fetchLocation} className="location-btn">
          Share My Location
        </button>
        {location && <p className="location-display">Location: {location}</p>}
      </div>
      <button onClick={handleSendAlert} className="send-alert-btn">
        Send Alert
      </button>
    </div>
  );
}

export default SOS;
