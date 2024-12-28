import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

// API Endpoints
export const fetchMedications = () => API.get("/medications");
export const addMedication = (data) => API.post("/medications", data);
export const generateReminders = (id) => API.post("/generate-reminders", { medicationId: id });

export const fetchDoctors = () => API.get("/doctors");
export const addDoctor = (data) => API.post("/doctors", data);

export const fetchAppointments = () => API.get("/appointments");
export const addAppointment = (data) => API.post("/appointments", data);

export const fetchReports = () => API.get("/reports");
export const addReport = (data) => API.post("/reports", data);

export const medicationQuery = (question) => API.post("/medication-query", { question });

