const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
});

const hospitalSchema = mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: Number, required: true },
  profileImg: { type: String },
  about: { type: String },
  doctors: { type: Array },
  address: { type: addressSchema, required: true },

  availableBeds: { Type: Number },
  avgRating: { Type: Number },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;

// Available Beds : General Room - VIP Room
// Ambulance

// Review
