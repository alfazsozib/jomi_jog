// controllers/paymentRequestController.js
import axios from "axios";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Booking from "../models/bookingModel.js"; // adjust path

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const UDDOKTAPAY_BASE_URL = process.env.UDDOKTAPAY_BASE_URL || "https://sandbox.uddoktapay.com";
const UDDOKTAPAY_API_KEY = process.env.UDDOKTAPAY_API_KEY || "982d381360a69d419689740d9f2e26ce36fb7a50";

export const requestPaymentAndNotify = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id).populate("userId");
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    const user = booking.userId;
    if (!user || !user.email) return res.status(404).json({ success: false, message: "User email not found" });

    // 1. Create UddoktaPay session
    const payload = {
      full_name: user.name || "Customer",
      email: user.email,
      amount: booking.price.toString(),
      redirect_url: "https://jomijog.com/payment/success",   // ← update to real URL
      cancel_url: "https://jomijog.com/payment/cancel",      // ← update to real URL
      phone: user.mobile || undefined,
      metadata: {
        booking_id: booking._id.toString(),
      },
    };

    const uddoktaRes = await axios.post(
      `${UDDOKTAPAY_BASE_URL}/api/checkout-v2`,
      payload,
      {
        headers: {
          "RT-UDDOKTAPAY-API-KEY": UDDOKTAPAY_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("[UddoktaPay Response]", JSON.stringify(uddoktaRes.data, null, 2));

    const paymentUrl = uddoktaRes.data?.payment_url 
                    || uddoktaRes.data?.checkout_url 
                    || uddoktaRes.data?.url 
                    || uddoktaRes.data?.redirect_url;

    if (!paymentUrl) {
      throw new Error("No payment URL received from UddoktaPay");
    }

    // 2. Send plain notification email (NO payment link)
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Payment Request for Your Booking",
      html: `
        <p>Hello ${user.name || "Customer"},</p>
        <p>We have processed your booking (ID: <strong>${booking._id}</strong>).</p>
        <p><strong>Amount due: ${booking.price} BDT</strong></p>
        <p>Please complete the payment at your earliest convenience to confirm the booking.</p>
        <p>You can make the payment through our secure payment portal (a link will be provided when you log in or via notification).</p>
        <p>Thank you for choosing us!</p>
        <p>Best regards,<br>Your Company Name</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 3. Return paymentUrl to frontend for popup
    res.status(200).json({
      success: true,
      paymentUrl,
      message: `Payment request email sent to ${user.email} & session ready`,
    });
  } catch (err) {
    console.error("[Payment Request Error]", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: "Failed to process payment request",
      error: err.message,
    });
  }
};