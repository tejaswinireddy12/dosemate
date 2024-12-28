import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
      <Link to="/" className="navbar-brand" >
                            <img src="/image1.png" alt="DoseMate-Logo" style={{ height: '50px' }} />
                            
                        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/reminders">Reminders</Link>
          </li>
          <li>
            <Link to="/SOS">SOS</Link>
          </li>
          {/* <li>
            <Link to="/health-tracker">Health Tracker</Link>
          </li> */}
          <li>
            <Link to="/appointments">Appointments</Link>
          </li>
          {/* <li>
            <Link to="/doctors">Doctors</Link>
          </li>
          <li>
            <Link to="/Reports">Reports</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
