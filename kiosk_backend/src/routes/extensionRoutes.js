import express from "express";
import { createExtension } from "../controllers/extensionController.js";

const router = express.Router();

router.post("/", createExtension);

export default router;
