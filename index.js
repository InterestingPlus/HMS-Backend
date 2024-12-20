const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const mongoose = require("mongoose");

const {
  getDoctor,
  getAllDoctors,
  addDoctor,
  loginDoctor,
  getAuthenticatedDoctor,
  TopDoctors,
} = require("./controllers/doctor.controller.js");

const {
  loginPatient,
  getAuthenticatedPatient,
  addPatient,
} = require("./controllers/patient.controller.js");
const {
  addAppointment,
  getAppointmentsPatient,
  getAppointmentsDoctor,
  updateStatus,
  checkBookedAppointments,
} = require("./controllers/appointment.controller.js");

const { otpVerification } = require("./controllers/email.controller.js");

const app = express();
app.use(cors());
// app.use(
//   cors({
//     // origin: "http://127.0.0.1:5500",
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   })
// );

// const corsOptions = {
//   origin: "*",
//   credentials: false,
// };

// app.use(cors(corsOptions));

app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Hospital Management System Backend!");
});
app.get("/get-doctor", getAllDoctors);
app.get("/top-doctor", TopDoctors);
app.post("/doctor", getDoctor);

app.post("/login-doctor", loginDoctor);
app.post("/create-doctor", addDoctor);
app.post("/auth-doctor", getAuthenticatedDoctor);

// ---

app.post("/login-patient", loginPatient);
app.post("/create-patient", addPatient);
app.post("/auth-patient", getAuthenticatedPatient);

app.post("/create-appointment", addAppointment);
app.post("/get-appointments-patient", getAppointmentsPatient);
app.post("/get-appointments-doctor", getAppointmentsDoctor);
app.post("/update-status", updateStatus);

app.post("/check-booked-appointments", checkBookedAppointments);

app.post("/otp-verification", otpVerification);

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
