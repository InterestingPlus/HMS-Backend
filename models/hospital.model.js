const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema({
  name: { type: String, required: true },
  // address, city, pincode, state,
  contact: { type: Number, required: true },
  doctorId: { type: Array },
});

const Hospital = mongoose.model("Doctor", hospitalSchema);

module.exports = Hospital;

// Available Beds : General Room - VIP Room
// Ambulance

// Review
