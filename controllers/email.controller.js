const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// OTP Verification
module.exports.otpVerification = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Email : ", email);

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send email
    const info = await transporter.sendMail({
      from: `"MediConnect" <${process.env.EMAIL_USER}>`,
      to: email, // recipient
      subject: "Your OTP Code for MediConnect",
      text: `Your OTP is ${otp}`,
      html: `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <!-- Logo -->
              <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://mediconnect-hms.netlify.app/logo.jpg" alt="MediConnect" style="max-width: 200px; height: auto;"/>
              </div>
              <h2 style="color: #144859; text-align: center;">MediConnect OTP Verification</h2>
              <p style="font-size: 16px; line-height: 1.6;">
                Dear User,
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                We received a request to verify your account on MediConnect. Please use the following One-Time Password (OTP) to complete your verification process:
              </p>
              <h3 style="background-color: #144859; color: white; padding: 10px; text-align: center; font-size: 24px; margin-top: 20px; border-radius: 5px;">
                ${otp}
              </h3>
              <p style="font-size: 16px; line-height: 1.6;">
                This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
              </p>
              <p style="font-size: 16px; line-height: 1.6;">
                Regards,<br />
                The MediConnect Team
              </p>
              <!-- Footer -->
              <div style="text-align: center; margin-top: 30px;">
                <img src="https://mediconnect-hms.netlify.app/logo.png" alt="MediConnect" style="max-width: 150px; height: auto;"/>
              </div>
            </div>
          </div>
        `,
    });

    console.log("Message sent: %s", info.messageId);

    // Respond with the OTP
    res.status(200).json({ success: true, otp });
  } catch (error) {
    console.log("Error sending email: ", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
