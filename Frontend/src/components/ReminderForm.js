import React, { useState } from "react";


function ReminderForm({ addReminder }) {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReminder(formData);
    setFormData({ name: "", dosage: "", frequency: "", startDate: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Medicine Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="dosage"
        placeholder="Dosage"
        value={formData.dosage}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="frequency"
        placeholder="Frequency (e.g., daily)"
        value={formData.frequency}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Reminder</button>
    </form>
  );
}

export default ReminderForm;
