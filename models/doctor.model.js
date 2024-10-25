const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,

  name: String,
  age: Number,
  specialization: String,
  contact: Number,
  availability: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
