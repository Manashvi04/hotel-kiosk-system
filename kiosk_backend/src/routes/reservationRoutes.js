import express from "express";
import {
  createReservation,
  verifyReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", createReservation);
router.post("/verify", verifyReservation);

export default router;
