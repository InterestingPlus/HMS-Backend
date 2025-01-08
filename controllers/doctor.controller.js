const Appointment = require("../models/appointment.model.js");
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
      about,
      gender,
      specialization,
      contact,
      address,
      availability,
      profileImg,
      consultationCharge,
    } = req.body;

    const result = await Doctor.create({
      username,
      password,
      name,
      age,
      about,
      gender,
      specialization,
      contact,
      address,
      availability,
      profileImg,
      consultationCharge,
    });

    console.log(
      `Doctor Created = Name : ${result.name} UserName : ${result.username}`
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
    console.log("Error While Creating Doctor!");

    res.json({
      message: "Failed to Create Doctor!",
      status: false,
    });
  }
};

module.exports.updateDoctor = async (req, res) => {
  try {
    const { id, name, age, about, address, contact, profileImg, availability } =
      req.body;

    const result = await Doctor.findOneAndUpdate(
      { _id: id },
      {
        name,
        age,
        about,
        address,
        contact,
        profileImg,
        availability,
      }
    );

    console.log(
      `Doctor Updated = Name : ${result.name} UserName : ${result.username}`
    );

    return res.status(200).json({
      message: "Doctor Profile Updated SuccessFully!",
      data: result,
      status: true,
    });
  } catch (err) {
    console.log("Error While Updating Doctor!");

    res.status(500).json({
      message: "Failed to Update Doctor!",
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

module.exports.TopDoctors = async (req, res) => {
  try {
    // Aggregate reviews to calculate number of ratings and average rating for each doctor
    const aggregatedData = await Review.aggregate([
      {
        $group: {
          _id: "$doctorId", // Group by doctorId
          numRatings: { $sum: 1 }, // Count the number of ratings
          avgRating: { $avg: "$rating" }, // Calculate the average rating
        },
      },
      {
        $sort: { avgRating: -1, numRatings: -1 }, // Sort by avgRating (desc) and then by numRatings (desc)
      },
      {
        $limit: 4, // Limit the result to top 4 doctors
      },
    ]);

    // Fetch doctor details for the aggregated data
    const topDoctors = await Doctor.find({
      _id: { $in: aggregatedData.map((d) => d._id) },
    }).lean();

    // Combine doctor details with the aggregated data
    const result = topDoctors.map((doctor) => {
      const aggData = aggregatedData.find((d) => d._id.toString() === doctor._id.toString());
      return {
        ...doctor,
        avgRating: aggData.avgRating,
        numRatings: aggData.numRatings,
      };
    });

    // Respond with the top doctors
    res.json({
      message: "Top Doctors Loaded Successfully!",
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching top doctors.",
      status: false,
      error: error.message,
    });
  }
};


module.exports.getDoctor = async (req, res) => {
  try {
    let username = req.body?.username;

    let data;

    if (!username) {
      data = await Doctor.findOne({ _id: req.body.id });
    } else {
      data = await Doctor.findOne({ username });
    }

    if (!data) {
      return res.status(404).json({
        message: "Doctor not found",
        status: false,
      });
    }

    const doctorData = data.toObject();

    delete doctorData?.password;

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

module.exports.doctorHistory = async (req, res) => {
  try {
    const id = req.body.id;

    // Fetch all appointments for the given doctorId
    const appHistory = await Appointment.find({
      doctorId: id,
      status: "visited",
    });

    // Extract unique doctorIds from appointments
    const patientIds = [...new Set(appHistory.map((app) => app.patientId))];

    // Fetch patient details for the collected patientIds
    const patients = await Patient.find({ _id: { $in: patientIds } });

    res.status(200).json({
      success: true,
      message: "Doctor history retrieved successfully.",
      data: patients,
    });
  } catch (error) {
    console.error("Error fetching doctor history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor history.",
      error: error.message,
    });
  }
};
