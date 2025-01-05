const Appointment = require("../models/appointment.model.js");
const Prescription = require("../models/prescription.model.js");

module.exports.addPrescription = async (req, res) => {
  const { appId, title, description, link } = req.body;

  try {
    const PrescriptionData = await Prescription.create({
      title,
      description,
      link,
    });

    const data = await Appointment.findOneAndUpdate(
      { _id: appId },
      { prescriptionId: PrescriptionData._id }
    );

    res.status(200).json({
      status: true,
      message: "Prescription Added!",
    });
  } catch (err) {
    console.log("Can't Add Prescription!");

    res.status(500).json({
      status: false,
      message: "Can't Add Prescription",
    });
  }
};

module.exports.viewPrescription = async (req, res) => {
  const { id } = req.body;

  try {
    const PrescriptionData = await Prescription.findOne({ _id: id });

    res.status(200).json({
      status: true,
      data: PrescriptionData,
      message: "Prescription Loaded!",
    });
  } catch (err) {
    console.log("Can't Load Prescription!");

    res.status(500).json({
      status: false,
      message: "Can't Load Prescription",
    });
  }
};
