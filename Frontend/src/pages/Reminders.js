import React, { useState, useEffect } from "react";
import axios from "axios"; // Importing axios
import ReminderForm from "../components/ReminderForm";
import ReminderList from "../components/ReminderList";
import './Reminders.css';

function Reminders() {
  const [reminders, setReminders] = useState([]);

  // Fetch reminders from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reminders") // Adjust the URL according to your backend API
      .then((response) => {
        setReminders(response.data); // Set the fetched reminders to state
      })
      .catch((error) => {
        console.error("There was an error fetching the reminders!", error);
      });
  }, []);

  // Add reminder and send it to the backend
  const addReminder = (reminder) => {
    axios
      .post("http://localhost:5000/api/reminders", reminder) // Adjust the URL according to your backend API
      .then((response) => {
        setReminders([...reminders, response.data]); // Add the new reminder to the state
      })
      .catch((error) => {
        console.error("There was an error adding the reminder!", error);
      });
  };

  // Remove reminder and update it on the backend
  const removeReminder = (index) => {
    const reminderToDelete = reminders[index];

    axios
      .delete(`http://localhost:5000/api/reminders/${reminderToDelete._id}`) // Adjust the URL according to your backend API
      .then(() => {
        const updatedReminders = reminders.filter((_, i) => i !== index);
        setReminders(updatedReminders); // Remove the reminder from the state
      })
      .catch((error) => {
        console.error("There was an error deleting the reminder!", error);
      });
  };

  return (
    <div className="reminders">
      <ReminderForm addReminder={addReminder} />
      <ReminderList reminders={reminders} removeReminder={removeReminder} />
    </div>
  );
}

export default Reminders;
