import express from "express";
import { createServiceRequest } from "../controllers/serviceRequestController.js";

const router = express.Router();

router.post("/", createServiceRequest);

export default router;
