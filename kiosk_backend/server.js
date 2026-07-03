import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/database/db.js";
import guestRoutes from "./src/routes/guestRoutes.js";
import reservationRoutes from "./src/routes/reservationRoutes.js";
import roomRoutes from "./src/routes/roomRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import digitalKeyRoutes from "./src/routes/digitalKeyRoutes.js";
import extensionRoutes from "./src/routes/extensionRoutes.js";
import feedbackRoutes from "./src/routes/feedbackRoutes.js";
import serviceRequestRoutes from "./src/routes/serviceRequestRoutes.js";
import checkoutRoutes from "./src/routes/checkoutRoutes.js";
import visitorRoutes from "./src/routes/visitorRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/guests", guestRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/digital-keys", digitalKeyRoutes);
app.use("/api/extensions", extensionRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/visitors", visitorRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "L'AURA Hotel API Running",
  });
});

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database Connected");
    console.log(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
}

testDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
