import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Booking from "../models/bookingModel.js"; // your Booking model (replace with your actual booking model path)

dotenv.config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // or any SMTP service
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send payment request email
export const sendPaymentRequest = async (req, res) => {
  try {
    const { id } = req.params; // booking id

    // Fetch the booking from DB
    const booking = await Booking.findById(id).populate("userId"); // assuming userId stores the user ref
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    
    const user = booking.userId;
    console.log(user)
    if (!user || !user.email) return res.status(404).json({ message: "User email not found" });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'aspro1141@gmail.com',
      subject: "Payment Request",
      text: `Hello ${user.name},\n\nThis is your payment request for booking ID: ${booking._id}.\nPlease make the payment at your earliest convenience.\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: `Payment email sent to ${user.email}` });
  } catch (err) {
    console.error("Error sending payment request:", err);
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
};
