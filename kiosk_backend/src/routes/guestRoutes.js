import express from "express";
import { createGuest } from "../controllers/guestController.js";

const router = express.Router();

router.post("/", createGuest);

export default router;
