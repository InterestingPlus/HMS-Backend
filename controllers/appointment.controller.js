const Appointment = require("../models/appointment.model.js");
const Doctor = require("../models/doctor.model.js");
const Patient = require("../models/patient.model.js");

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

    const data1 = await Promise.all(
      data.map(async (p) => {
        const patient = await Patient.findOne({ _id: p.patientId });

        const app = p.toObject();
        app.patientName = patient.name;
        delete app.doctorId;
        delete app.patientId;

        return app;
      })
    );

    res.json({
      message: "Data Loaded SuccessFully!",
      status: true,
      data: data1,
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

    const data1 = await Promise.all(
      data.map(async (d) => {
        const doctor = await Doctor.findOne({ _id: d.doctorId });

        const app = d.toObject();
        app.doctorName = doctor.name;
        delete app.doctorId;
        delete app.patientId;

        return app;
      })
    );

    res.json({
      message: "Data Loaded SuccessFully!",
      status: true,
      data: data1,
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

module.exports.updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const data = await Appointment.findOneAndUpdate({ _id: id }, { status });

    if (!data) {
      return res.json({
        message: "Something Went Wrong",
        status: false,
      });
    }

    const patientData = data.toObject();

    delete patientData.password;

    res.json({
      message: "Status Updated",
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

module.exports.checkBookedAppointments = async (req, res) => {
  try {
    const { username } = req.body;

    const doctor = await Doctor.findOne({ username });
    if (!doctor) {
      return res.json({
        message: "No doctor found with the provided username.",
        status: true,
        data: [],
      });
    }

    const appointments = await Appointment.find(
      { doctorId: doctor._id, status: { $ne: "rejected" } },
      { date: 1, time: 1, _id: 0 }
    );

    return res.json({
      message: "Appointment Data Loaded Successfully!",
      status: true,
      data: appointments,
    });
  } catch (err) {
    console.error("Error loading appointments:", err);

    return res.status(500).json({
      message: "Failed to get appointments!",
      status: false,
      error: err.message,
    });
  }
};
