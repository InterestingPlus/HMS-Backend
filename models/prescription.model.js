const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
