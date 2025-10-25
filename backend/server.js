// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import adminBooking from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - replace with your frontend URL in production
app.use(
  cors({
    origin: "https://jomijog.com", // change to your deployed frontend URL
    credentials: true,
  })
);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/bookings/admin", adminBooking);
app.use("/api/bookings", paymentRoutes);
app.use("/api", contactRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Serve React build (frontend)
const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));

app.get(/^\/(?!api).*$/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
