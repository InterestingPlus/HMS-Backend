const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, required: true },

  name: { type: String, required: true },
  age: Number,
  gender: { type: String, enum: ["male", "female"] },
  specialization: { type: String, required: true },
  contact: Number,
  address: { type: Object },
  availability: { type: Array, required: true },
  consultationCharge: Number,
  profileImg: String,
  avgRating: { type: Number },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;

// Qualification
// Experience
// Language
// Achievements

// Patient Review
