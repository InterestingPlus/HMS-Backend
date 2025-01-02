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

    console.log(PrescriptionData);

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
