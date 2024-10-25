const Appointment = require("../models/appointment.model.js");

module.exports.addAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, time, reason } = req.body;

    const result = await Appointment.create({
      doctorId,
      patientId,
      date,
      time,
      reason,
    });

    console.log(
      `Appointment Booked = Date : ${result.date} Time : ${result.time}`
    );

    return res.json({
      message: "Appointment Booked SuccessFully!",
      status: true,
    });
  } catch (err) {
    console.log("Error While Booking Appointment : ", err);

    res.json({
      message: "Failed to Book Appointment!",
      status: false,
    });
  }
};

module.exports.getAppointmentsDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;

    const data = await Appointment.find({ doctorId });

    res.json({
      message: "Data Loaded SuccessFully!",
      status: true,
      data,
    });
  } catch (err) {
    console.log("Error ", err);

    res.json({
      message: "Failed to Get Appointments!",
      status: false,
    });
  }
};
module.exports.getAppointmentsPatient = async (req, res) => {
  try {
    const { patientId } = req.body;

    const data = await Appointment.find({ patientId });

    res.json({
      message: "Data Loaded SuccessFully!",
      status: true,
      data,
    });
  } catch (err) {
    console.log("Error ", err);

    res.json({
      message: "Failed to Get Appointments!",
      status: false,
    });
  }
};

module.exports.getPatient = async (req, res) => {
  try {
    const username = req.body.username;

    const data = await Appointment.findOne({ username });

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

    const result = await Appointment.findOne({ username, password });

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

    const data = await Appointment.findOne({ _id: id, username });

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
