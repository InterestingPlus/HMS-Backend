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
      gender,
      specialization,
      contact,
      address,
      availability,
      profileImg,
      consultationCharge,
    } = req.body;

    console.log(address);

    const result = await Doctor.create({
      username,
      password,
      name,
      age,
      gender,
      specialization,
      contact,
      address,
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
    const { page = 1, limit = 8 } = req.query; // Default values for page and limit

    const skip = (page - 1) * limit;

    const doctors = await Doctor.find().skip(skip).limit(parseInt(limit, 10));

    const totalDoctors = await Doctor.countDocuments();

    res.json({
      message: "Doctors Loaded Successfully!",
      data: doctors,
      currentPage: parseInt(page, 10),
      hasMore: totalDoctors > skip + doctors.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, status: false });
  }
};

module.exports.searchDoctor = async (req, res) => {
  try {
    const { search } = req.body;

    const doctors = await Doctor.find({
      name: { $regex: new RegExp(search, "i") }, // Case-insensitive regex search
    });

    if (doctors.length === 0) {
      return res.status(404).json({
        message: "No doctors found!",
        status: false,
        data: [],
      });
    }

    res.status(200).json({
      message: "Doctors found successfully!",
      status: true,
      data: doctors,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while searching for doctors!",
      status: false,
      error: err.message,
    });
  }
};

module.exports.getDoctors = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default values

    // Convert query params to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate skip value
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch doctors with pagination
    const doctors = await Doctor.find()
      .skip(skip) // Skip records based on page
      .limit(limitNumber) // Limit the number of records fetched
      .sort({ createdAt: -1 }); // Sort by newest doctors first (optional)

    // Total count for frontend (for "No More Profiles" logic)
    const totalDoctors = await Doctor.countDocuments();

    res.status(200).json({
      message: "Doctors fetched successfully",
      status: true,
      data: doctors,
      totalPages: Math.ceil(totalDoctors / limitNumber), // Total pages
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
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
          gender: 1,
          _id: 0,
        });

        return {
          rating: review?.rating || 0,
          patientName: patient?.name || "Unknown Patient",
          patientImg: patient?.profileImg || "",
          gender: patient?.gender || "",
          title: review?.title || "",
          review: review?.review || "",
        };
      })
    );

    // Attach reviews to the doctor data
    doctorData.reviews = await reviewsWithPatientInfo;

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
