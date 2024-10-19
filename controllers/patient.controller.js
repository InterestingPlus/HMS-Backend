const Doctor = require("../models/doctor.model.js");

module.exports.addPatient = async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      age,
      specialization,
      contact,
      availability,
    } = req.body;

    const result = await Doctor.create({
      username,
      password,
      name,
      age,
      specialization,
      contact,
      availability,
    });

    console.log(
      `Doctor Created = Name : ${result.name} UserName : ${result.username} Specialization : ${specialization}`
    );

    return res.json({
      message: "Doctor Profile Created SuccessFully!",
      data: {
        id: result.id,
        username: req.body.name,
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

module.exports.getAllPatients = async (req, res) => {
  const data = await Doctor.find();

  res.json({
    message: "Data Loaded SuccessFully!",
    status: true,
    data,
  });
};

module.exports.getPetient = async (req, res) => {
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
