const Doctor = require("../models/doctor.model");
const Hospital = require("../models/hospital.model");

module.exports.getAllHospitals = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query; // Default values for page and limit

    const skip = (page - 1) * limit;

    const hospitals = await Hospital.find()
      .skip(skip)
      .limit(parseInt(limit, 10));

    const totalHospitals = await Hospital.countDocuments();

    res.json({
      message: "Hospitals Loaded Successfully!",
      data: hospitals,
      currentPage: parseInt(page, 10),
      hasMore: totalHospitals > skip + hospitals.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, status: false });
  }
};

module.exports.searchHospital = async (req, res) => {
  try {
    const { search } = req.body;

    const hospitals = await Hospital.find({
      name: { $regex: new RegExp(search, "i") }, // Case-insensitive regex search
    });

    if (hospitals.length === 0) {
      return res.status(404).json({
        message: "No Hospitals found!",
        status: false,
        data: [],
      });
    }

    res.status(200).json({
      message: "Hospitals found successfully!",
      status: true,
      data: hospitals,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while searching for Hospitals!",
      status: false,
      error: err.message,
    });
  }
};

module.exports.TopHospitals = async (req, res) => {
  try {
    const data = await Hospital.find().sort({ avgRating: -1 }).limit(4);

    res.json({
      message: "Top Hospitals Loaded Successfully!",
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching Hospitals.",
      status: false,
      error: error.message,
    });
  }
};

module.exports.getHospital = async (req, res) => {
  try {
    const data = await Hospital.findOne({ _id: req.body.id });

    if (!data) {
      return res.status(404).json({
        message: "Hospital not found",
        status: false,
      });
    }

    const Hospital_data = data.toObject();

    let HospitalWithDoctorInfo;

    if (Hospital_data?.doctors?.length > 0) {
      HospitalWithDoctorInfo = await Promise.all(
        Hospital_data?.doctors?.map(async (doctorId) => {
          const doctor = await Doctor.findById(doctorId, {
            username: 1,
            name: 1,
            profileImg: 1,
            gender: 1,
            specialization: 1,
            avgRating: 1,
            consultationCharge: 1,
            _id: 0,
          });

          return {
            doctorUsername: doctor.username,
            doctorName: doctor?.name || "Unknown Doctor",
            doctorImg: doctor?.profileImg,
            gender: doctor?.gender,
            rating: doctor?.avgRating || 0,
            consultationCharge: doctor?.consultationCharge,
            specialization: doctor?.specialization,
          };
        })
      );
    } else {
      HospitalWithDoctorInfo = false;
    }

    // Attach reviews to the doctor data
    Hospital_data.doctors = await HospitalWithDoctorInfo;

    res.json({
      message: "Data Loaded Successfully!",
      status: true,
      data: Hospital_data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      status: false,
      error: error.message,
    });
  }
};
