import express from "express";
import { verifyIdentity } from "../controllers/identityverificationController.js";

const router = express.Router();

router.post("/verify", verifyIdentity);

export default router;
