const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const {
  getDoctor,
  getAllDoctors,
  addDoctor,
  loginDoctor,
  getAuthenticatedDoctor,
  TopDoctors,
  searchDoctor,
  updateDoctor,
} = require("./controllers/doctor.controller.js");

const {
  loginPatient,
  getAuthenticatedPatient,
  addPatient,
  updatePatient,
} = require("./controllers/patient.controller.js");
const {
  addAppointment,
  getAppointmentsPatient,
  getAppointmentsDoctor,
  updateStatus,
  checkBookedAppointments,
} = require("./controllers/appointment.controller.js");

const { otpVerification } = require("./controllers/email.controller.js");
const {
  getAllNotifications,
  deleteNotification,
} = require("./controllers/notification.controller.js");
const {
  getAllCategories,
  addCategory,
} = require("./controllers/category.controller.js");
const {
  addReview,
  checkReview,
} = require("./controllers/review.controller.js");
const { dietSuggestions } = require("./controllers/suggestion.controller.js");
const { addPrescription } = require("./controllers/prescription.controller.js");

const app = express();

// Middleware for enabling multiple origins in CORS
const corsOptions = {
  // origin: ["http://localhost:3000", "https://MediConnect-hms.netlify.app"],
  origin: "*",
  methods: "GET,POST,DELETE",
};

// Create an HTTP server to use with Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: corsOptions,
});

// Add Socket.IO connection
io.on("connection", (socket) => {
  // console.log("New client connected:", socket.id);

  socket.on("status", (data) => {
    io.emit("new-notification", data);
  });
});
module.exports = { io };

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
const db_uri = process.env.DATABASE_URI;
const PORT = process.env.PORT || 2000;

mongoose
  .connect(db_uri)
  .then(() => {
    console.log("Connected to MongoDB...!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB : ", error);
  });

// Routes
app.get("/", (req, res) => {
  res.send("MediConnect : Hospital Management System Backend!");
});

// Doctor Route
app.get("/get-doctor", getAllDoctors);
app.post("/search-doctor", searchDoctor);
app.get("/top-doctor", TopDoctors);
app.post("/doctor", getDoctor);

app.post("/login-doctor", loginDoctor);
app.post("/create-doctor", addDoctor);
app.post("/update-doctor", updateDoctor);
app.post("/auth-doctor", getAuthenticatedDoctor);

// Patient Route
app.post("/login-patient", loginPatient);
app.post("/create-patient", addPatient);
app.post("/update-patient", updatePatient);
app.post("/auth-patient", getAuthenticatedPatient);

// Appointment Route
app.post("/create-appointment", addAppointment);
app.post("/get-appointments-patient", getAppointmentsPatient);
app.post("/get-appointments-doctor", getAppointmentsDoctor);
app.post("/update-status", updateStatus);
app.post("/check-booked-appointments", checkBookedAppointments);

// Prescription Route
app.post("/add-prescription", addPrescription);

// NodeMailer Route
app.post("/otp-verification", otpVerification);

// Notification Route
app.post("/get-all-notification", getAllNotifications);
app.post("/delete-notification", deleteNotification);

// Category Route
app.post("/add-category", addCategory);
app.get("/get-all-categories", getAllCategories);

// Review Route
app.post("/add-review", addReview);
app.post("/check-review", checkReview);

// Google Gemini
app.post("/diet-suggestions", dietSuggestions);

// Start the server with Socket.IO
server.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
