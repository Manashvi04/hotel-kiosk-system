import express from "express";
import { createDigitalKey } from "../controllers/digitalKeyController.js";

const router = express.Router();

router.post("/", createDigitalKey);

export default router;
