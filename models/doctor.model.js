const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
});

const doctorSchema = mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String, required: true },

    name: { type: String, required: true },
    age: Number,
    gender: { type: String },
    specialization: { type: String, required: true },
    contact: Number,
    about: { type: String },

    address: { type: addressSchema, required: true },

    availability: { type: Array, required: true },
    consultationCharge: { type: Number, default: 100 },
    profileImg: String,
    avgRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;

// Qualification
// Experience
// Language
// Achievements

// Patient Review
