import React from "react";


function ReminderList({ reminders, removeReminder }) {
  return (
    <div>
      <h2>Your Reminders</h2>
      {reminders.length === 0 ? (
        <p>No reminders yet.</p>
      ) : (
        reminders.map((reminder, index) => (
          <div key={index} className="reminder-card">
            <h3>{reminder.name}</h3>
            <p>Dosage: {reminder.dosage}</p>
            <p>Frequency: {reminder.frequency}</p>
            <p>Start Date: {reminder.startDate}</p>
            <button onClick={() => removeReminder(index)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ReminderList;
