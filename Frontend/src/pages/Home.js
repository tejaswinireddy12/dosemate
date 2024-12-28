import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to DoseMate</h1>

      </header>

      <section className="home-intro">
        <h2>Why to Choose DoseMate?</h2>
        <p>DoseMate helps you take control of your health by simplifying medication reminders.</p>
        <p>Our goal is to keep you healthy, organized, and stress-free.</p>
      </section>

      <section className="home-features">
        <h2>Key Features</h2>
        <ul>
          <li><strong>Medicine Remainders:</strong> Get timely notifications for your medication schedule.</li>
          <br/>
          <li><strong>Health Tracker:</strong> Monitor your daily activities, sleep, and hydration.</li>
          <br/>
          <li><strong>Appointments:</strong> Keep track of your doctor visits and schedule follow-ups.</li>
          <br/>
          <li><strong>Doctor Directory:</strong> Access contact details of your healthcare providers.</li>
          <br/>
          <li><strong>AI Chatbot:</strong> Ask health-related queries and get instant responses.</li>
          <br/>
        </ul>
      </section>

      {/* <section className="home-quick-links">
        <h2>Quick Links</h2>
        <div className="quick-links">
          <a href="/reminders" className="quick-link">Set Remainders</a>
          <a href="/health-tracker" className="quick-link">Track Health</a>
          <a href="/appointments" className="quick-link">View Appointments</a>
          <a href="/doctors" className="quick-link">Find Doctors</a>
        </div>
      </section> */}

      {/* <section className="home-user-tips">
        <h2>Health Tips</h2>
        <p>💡 Stay hydrated and aim to drink 2 liters of water daily.</p>
        <p>💡 Get at least 7-8 hours of sleep for optimal health.</p>
        <p>💡 Take medications at the same time each day to build consistency.</p>
      </section> */}
    </div>
  );
}

export default Home;
