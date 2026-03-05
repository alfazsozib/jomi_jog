import express from "express";
import {requestPaymentAndNotify} from "../controllers/paymentRequestController.js";

const router = express.Router();

// POST /api/bookings/admin/payment-request/:id
router.post("/admin/payment-request/:id", requestPaymentAndNotify);
router.post("/admin/payment-request/:id", requestPaymentAndNotify);

export default router;
