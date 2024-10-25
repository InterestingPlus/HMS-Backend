const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  doctorId: String,
  patientId: String,
  date: String,
  time: String,
  reason: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
