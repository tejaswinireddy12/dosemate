import React, { useState } from "react";
import "./Reports.css";

function Reports() {
  const [reports, setReports] = useState([
    {
      title: "Weekly Medication Adherence",
      date: "2024-11-10",
      summary:
        "You adhered to your medication schedule 90% of the time this week. Great job! Aim for 100% next week.",
    },
    {
      title: "Missed Doses Report",
      date: "2024-11-05",
      summary:
        "You missed 2 doses this week: Aspirin on Monday and Vitamin D on Thursday. Try setting stronger reminders.",
    },
    {
      title: "Monthly Summary",
      date: "2024-10-31",
      summary:
        "Your medication adherence for October was 85%. Consistency improved compared to September.",
    },
  ]);

  return (
    <div className="reports-container">
      <h1>Medication Reports</h1>
      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        reports.map((report, index) => (
          <div key={index} className="report-card">
            <h2>{report.title}</h2>
            <p className="report-date">Date: {report.date}</p>
            <p className="report-summary">{report.summary}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Reports;
