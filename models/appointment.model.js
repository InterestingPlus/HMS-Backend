const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "visited"],
      default: "pending",
    },
    presciption: { type: String },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
