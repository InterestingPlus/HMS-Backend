const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,

  name: String,
  age: Number,
  contact: Number,
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;


// Address
// History
// Blood Group / Pressure
// Medical History
// Insurance
