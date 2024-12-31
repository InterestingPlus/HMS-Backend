const Appointment = require("../models/appointment.model.js");
const Doctor = require("../models/doctor.model.js");
const Review = require("../models/review.model.js");

async function updateAverageRating(id, newRating) {
  try {
    const allRatings = await Review.find(
      { doctorId: id },
      { rating: 1, _id: 0 }
    );

    let avgRating;

    if (allRatings.length > 0) {
      const ratings = allRatings.map((review) => review.rating);
      ratings.push(newRating);
      avgRating = Math.floor(
        ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      );
    } else {
      avgRating = newRating;
    }

    await Doctor.findOneAndUpdate({ _id: id }, { avgRating });
  } catch (err) {
    console.error("Error updating Average Rating");
  }
}

module.exports.addReview = async (req, res) => {
  const { doctorId, patientId, rating, title, review } = req.body;

  try {
    const isAlreadyAdded = await Review.findOne({ doctorId, patientId });

    if (!isAlreadyAdded) {
      await Review.create({ doctorId, patientId, rating, title, review });

      updateAverageRating(doctorId, rating);

      return res.status(200).json({
        message: "Review Added SuccessFully!",
        status: true,
      });
    } else {
      await Review.findOneAndUpdate(
        {
          doctorId,
          patientId,
        },
        {
          rating,
          title,
          review,
        }
      );

      return res.status(200).json({
        message: "Review has Updadted SuccessFully!",
        status: true,
      });
    }
  } catch (err) {
    console.log("Error While Adding Review!");
    return res.status(500).json({
      message: "Can't add Review!",
      status: false,
    });
  }
};

module.exports.checkReview = async (req, res) => {
  try {
    const { userId } = req.body;

    let final_result = false;
    let message;

    const reviews = await Review.find(
      { patientId: userId },
      { doctorId: 1, _id: 0 }
    );

    // Extract doctorIds for which the patient has already given a review
    const reviewedDoctorIds = reviews.map((review) => review.doctorId);

    const appointment_data = await Appointment.findOne({
      patientId: userId,
      status: "visited",
      doctorId: { $nin: reviewedDoctorIds },
    });

    if (appointment_data) {
      const review_data = await Review.findOne({
        doctorId: appointment_data.doctorId,
        patientId: appointment_data.patientId,
      });

      message = "Visited Appointments Fetched";

      if (review_data) {
        message = "Reviews Fetched!";
        final_result = false;
      } else {
        const doctor_data = await Doctor.findOne({
          _id: appointment_data.doctorId,
        });

        final_result = {
          doctorId: doctor_data._id,
          doctorImg: doctor_data.profileImg,
          doctorName: doctor_data.name,
          doctorUsername: doctor_data.username,
          patientId: userId,
        };
      }
    } else {
      final_result = false;

      message = "Can't fetch Visited Appointments..";
    }

    res.status(200).json({
      message,
      data: final_result,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Cannot find the Visited Appointments!",
      status: false,
    });
  }
};
