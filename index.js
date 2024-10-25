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
} = require("./controllers/doctor.controller.js");

const {
  loginPatient,
  getAuthenticatedPatient,
  addPatient,
} = require("./controllers/patient.controller.js");
const { addAppointment, getAppointmentsPatient, getAppointmentsDoctor } = require("./controllers/appointment.controller.js");

const app = express();
app.use(cors());
// app.use(cors({
//   origin: "http://127.0.0.1:5500"
// }));

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

app.get("/get-doctor", getAllDoctors);
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

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
