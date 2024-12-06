const Patient = require("../models/patient.model.js");

module.exports.addPatient = async (req, res) => {
  try {
    const { username, password, name, age, contact } = req.body;

    const result = await Patient.create({
      username,
      password,
      name,
      age,
      contact,
    });

    console.log(
      `Patient Created = Name : ${result.name} UserName : ${result.username}`
    );

    return res.json({
      message: "Patient Profile Created SuccessFully!",
      data: {
        id: result._id,
        username: result.username,
        role: "p",
      },
      status: true,
    });
  } catch (err) {
    console.log("Error While Creating Patient : ", err);

    res.json({
      message: "Failed to Create Patient!",
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
