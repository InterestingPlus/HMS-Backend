const Appointment = require("../models/appointment.model.js");
const Doctor = require("../models/doctor.model.js");
const Patient = require("../models/patient.model.js");
const Notification = require("../models/notification.model.js");

module.exports.addAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, time, reason } = req.body;

    const isAlreadyBooked = await Appointment.findOne({
      doctorId,
      date,
      time,
    });

    if (!isAlreadyBooked) {
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

      return res.status(200).json({
        message: "Appointment Booked SuccessFully!",
        status: true,
      });
    } else {
      return res.status(200).json({
        message: "Appointment has Already Booked!",
        status: false,
      });
    }
  } catch (err) {
    console.log("Error While Booking Appointment");

    res.status(500).json({
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
        app.patientImg = patient.profileImg;
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
        app.doctorImg = doctor.profileImg;
        app.doctorGender = doctor?.gender;
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

module.exports.updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const data = await Appointment.findOneAndUpdate({ _id: id }, { status });

    // if (!data) {
    //   return res.json({
    //     message: "Something Went Wrong",
    //     status: false,
    //   });
    // }

    if (data) {
      const notification = await Notification.create({
        recipientId: data.patientId,
        recipientType: "patient",
        type: "status",
        message: `Your appointment has been ${status}.`,
      });

      console.log("new Notification", notification);
    }

    res.json({
      message: "Appointment status updated successfully!",
      data,
    });
  } catch (error) {
    res.json({ error: "Failed to update appointment status." });
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
    console.log("Error loading appointments:", err);

    return res.status(500).json({
      message: "Failed to get appointments!",
      status: false,
      error: err.message,
    });
  }
};
