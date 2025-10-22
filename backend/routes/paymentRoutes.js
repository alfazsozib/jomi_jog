import express from "express";
import {sendPaymentRequest} from "../controllers/paymentRequestController.js";

const router = express.Router();

// POST /api/bookings/admin/payment-request/:id
router.post("/admin/payment-request/:id", sendPaymentRequest);

export default router;
