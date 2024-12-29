const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, maxLength: 100 },
    review: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
