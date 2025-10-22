import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Booking from "../models/bookingModel.js"; // Your Booking model
import axios from "axios";

dotenv.config();

// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send payment request email
export const sendPaymentRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch booking & user
    const booking = await Booking.findById(id).populate("userId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const user = booking.userId;
    if (!user || !user.email) return res.status(404).json({ message: "User email not found" });

    // ----- bKash Payment API -----
    const bkashRes = await axios.post(
      "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create",
      {
        amount: booking.price,
        intent: "sale",
        merchantInvoiceNumber: booking._id.toString(),
        currency: "BDT",
      },
      {
        headers: {
          username: process.env.BKASH_USER,
          password: process.env.BKASH_PASS,
          accept: "application/json",
          "content-type": "application/json",
        },
      }
    );

    const paymentID = bkashRes.data.paymentID;
    const paymentUrl = `https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/payment?paymentID=${paymentID}`;

    // ----- Send Email -----
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Payment Request",
      html: `
        <p>Hello ${user.name},</p>
        <p>Your payment for booking ID: <strong>${booking._id}</strong> is requested.</p>
        <p>Amount: <strong>${booking.price} BDT</strong></p>
        <a href="${paymentUrl}" target="_blank" 
          style="display:inline-block; padding:10px 20px; background:#f7941d; color:white; text-decoration:none; border-radius:5px;">
          Pay with bKash
        </a>
        <p>Thank you!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: `Payment email sent to ${user.email}` });
  } catch (err) {
    console.error("Error sending payment request:", err);
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
};
