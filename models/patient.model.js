const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
});

const patientSchema = mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,

    name: String,
    age: Number,
    contact: Number,
    gender: String,

    address: { type: addressSchema, required: true },

    profileImg: String,
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

// History
// Blood Group / Pressure
// Medical History
// Insurance
