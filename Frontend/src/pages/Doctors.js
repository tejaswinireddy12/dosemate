import React from "react";
import "./Doctors.css";

const doctorsList = [
  { name: "Dr. John Smith", specialty: "Cardiologist", contact: "123-456-7890" },
  { name: "Dr. Jane Doe", specialty: "Dermatologist", contact: "987-654-3210" },
  { name: "Dr. Emily Brown", specialty: "Pediatrician", contact: "555-555-5555" },
];

function Doctors() {
  return (
    <div className="doctors-container">
      <h1>Meet Our Doctors</h1>
      <div className="doctors-list">
        {doctorsList.map((doctor, index) => (
          <div key={index} className="doctor-card">
            <h2>{doctor.name}</h2>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <p><strong>Contact:</strong> {doctor.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
