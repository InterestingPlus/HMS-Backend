const Appointment = require("../models/appointment.model.js");
const Doctor = require("../models/doctor.model.js");
const Patient = require("../models/patient.model.js");

module.exports.addPatient = async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      age,
      address,
      gender,
      contact,
      profileImg,
    } = req.body;

    const result = await Patient.create({
      username,
      password,
      name,
      age,
      address,
      gender,
      contact,
      profileImg,
    });

    console.log(
      `Patient Created = Name : ${result.name} UserName : ${result.username}`
    );

    return res.status(200).json({
      message: "Patient Profile Created SuccessFully!",
      data: {
        id: result._id,
        username: result.username,
        role: "p",
      },
      status: true,
    });
  } catch (err) {
    console.log("Error While Creating Patient!");

    res.status(500).json({
      message: "Failed to Create Patient!",
      status: false,
    });
  }
};

module.exports.updatePatient = async (req, res) => {
  try {
    const { id, name, age, address, contact, profileImg } = req.body;

    const result = await Patient.findOneAndUpdate(
      { _id: id },
      {
        name,
        age,
        address,
        contact,
        profileImg,
      }
    );

    console.log(
      `Patient Updated = Name : ${result.name} UserName : ${result.username}`
    );

    return res.status(200).json({
      message: "Patient Profile Updated SuccessFully!",
      data: result,
      status: true,
    });
  } catch (err) {
    console.log("Error While Updating Patient!");

    res.status(500).json({
      message: "Failed to Update Patient!",
      status: false,
    });
  }
};

module.exports.getAllPatients = async (req, res) => {
  const data = await Patient.find();

  res.json({
    message: "Data Loaded SuccessFully!",
    status: true,
    data,
  });
};

module.exports.getPatient = async (req, res) => {
  try {
    const username = req.body.username;

    const data = await Patient.findOne({ username });

    if (!data) {
      return res.status(404).json({
        message: "Patient not found",
        status: false,
      });
    }

    const patientData = data.toObject();

    delete patientData.password;

    res.json({
      message: "Data Loaded Successfully!",
      status: true,
      data: patientData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      status: false,
      error: error.message,
    });
  }
};

module.exports.loginPatient = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await Patient.findOne({ username, password });

    if (!result) {
      return res.json({
        message: "Patient not found",
        status: false,
      });
    }

    const patientData = result.toObject();

    delete patientData.password;

    res.json({
      message: "Data Loaded Successfully!",
      status: true,
      data: {
        id: patientData._id,
        username: patientData.username,
        role: "p",
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

module.exports.getAuthenticatedPatient = async (req, res) => {
  try {
    const { id, username } = req.body;

    const data = await Patient.findOne({ _id: id, username });

    if (!data) {
      return res.json({
        message: "Patient not found",
        status: false,
      });
    }

    const patientData = data.toObject();

    delete patientData.password;

    res.json({
      message: "Data Loaded Successfully!",
      status: true,
      data: patientData,
    });
  } catch (error) {
    res.json({
      message: "Server Error",
      status: false,
      error: error.message,
    });
  }
};

module.exports.patientHistory = async (req, res) => {
  try {
    const id = req.body.id;

    // Fetch all appointments for the given patientId
    const appHistory = await Appointment.find({
      patientId: id,
      status: "visited",
    });

    // Extract unique doctorIds from appointments
    const doctorIds = [...new Set(appHistory.map((app) => app.doctorId))];

    // Fetch patient details for the collected doctorIds
    const doctors = await Doctor.find({ _id: { $in: doctorIds } });

    res.status(200).json({
      success: true,
      message: "Patient history retrieved successfully.",
      data: doctors,
    });
  } catch (error) {
    console.error("Error fetching patient history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve patient history.",
      error: error.message,
    });
  }
};
