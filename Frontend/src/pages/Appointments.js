import React, { useState } from "react";
import "./Appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ date: "", time: "", doctor: "" });

  const handleAddAppointment = () => {
    if (formData.date && formData.time && formData.doctor) {
      setAppointments([...appointments, formData]);
      setFormData({ date: "", time: "", doctor: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="appointments-container">
      <h1>Manage Your Appointments</h1>
      <div className="appointment-form">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="doctor"
          placeholder="Doctor's Name"
          value={formData.doctor}
          onChange={handleInputChange}
        />
        <button onClick={handleAddAppointment}>Add</button>
      </div>
      <ul className="appointment-list">
        {appointments.map((appt, index) => (
          <li key={index} className="appointment-item">
            <span>
              {appt.date} at {appt.time} with Dr. {appt.doctor}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
