const Doctor = require("../models/doctor.model.js");
const Patient = require("../models/patient.model.js");
const Review = require("../models/review.model.js");

module.exports.addDoctor = async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      age,
      specialization,
      contact,
      availability,
      profileImg,
      consultationCharge,
    } = req.body;

    const result = await Doctor.create({
      username,
      password,
      name,
      age,
      specialization,
      contact,
      availability,
      profileImg,
      consultationCharge,
    });

    console.log(
      `Doctor Created = Name : ${result.name} UserName : ${result.username} Specialization : ${result.specialization}`
    );

    return res.json({
      message: "Doctor Profile Created SuccessFully!",
      data: {
        id: result._id,
        username: result.username,
        role: "d",
      },
      status: true,
    });
  } catch (err) {
    console.log("Error While Creating Doctor : ", err);

    res.json({
      message: "Failed to Create Doctor!",
      status: false,
    });
  }
};

module.exports.getAllDoctors = async (req, res) => {
  try {
    const data = await Doctor.find();

    res.json({
      message: "Doctors Loaded Successfully!",
      status: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching doctors.",
      status: false,
      error: error.message,
    });
  }
};

module.exports.TopDoctors = async (req, res) => {
  try {
    // const data = await Doctor.find().sort({ rating: -1 }).limit(10);
    const data = await Doctor.find().limit(6).lean();

    data.forEach((doctor) => {
      delete doctor.password;
    });

    res.json({
      message: "Top Doctors Loaded Successfully!",
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching doctors.",
      status: false,
      error: error.message,
    });
  }
};

module.exports.getDoctor = async (req, res) => {
  try {
    const username = req.body.username;

    const data = await Doctor.findOne({ username });

    if (!data) {
      return res.status(404).json({
        message: "Doctor not found",
        status: false,
      });
    }

    const doctorData = data.toObject();

    delete doctorData.password;

    const review_data = await Review.find({ doctorId: doctorData._id });

    const reviewsWithPatientInfo = await Promise.all(
      review_data.map(async (review) => {
        const patient = await Patient.findById(review.patientId, {
          name: 1,
          profileImg: 1,
        });

        return {
          rating: review.rating,
          patientName: patient?.name || "Unknown Patient",
          patientImg: patient?.profileImg || "",
          title: review.title,
          review: review.review,
        };
      })
    );

    // Attach reviews to the doctor data
    doctorData.reviews = reviewsWithPatientInfo;

    res.json({
      message: "Data Loaded Successfully!",
      status: true,
      data: doctorData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      status: false,
      error: error.message,
    });
  }
};

module.exports.loginDoctor = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await Doctor.findOne({ username, password });

    if (!result) {
      return res.json({
        message: "Doctor not found",
        status: false,
      });
    }

    const doctorData = result.toObject();

    delete doctorData.password;

    res.json({
      message: "Data Loaded Successfully!",
      status: true,
      data: {
        id: doctorData._id,
        username: doctorData.username,
        role: "d",
      },
    });
  } catch (error) {
    res.json({
      message: "Server Error",
      status: false,
      error: error.message,
    });
  }
};

module.exports.getAuthenticatedDoctor = async (req, res) => {
  try {
    const { id, username } = req.body;

    const data = await Doctor.findOne({ _id: id, username });

    if (!data) {
      return res.json({
        message: "Doctor not found",
        status: false,
      });
    }

    const doctorData = data.toObject();

    delete doctorData.password;

    res.json({
      message: "Data Loaded Successfully!",
      status: true,
      data: doctorData,
    });
  } catch (error) {
    res.json({
      message: "Server Error",
      status: false,
      error: error.message,
    });
  }
};
