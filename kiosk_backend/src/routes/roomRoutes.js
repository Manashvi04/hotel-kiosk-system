import express from "express";
import { getAvailableRooms } from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getAvailableRooms);

export default router;
