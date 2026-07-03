import express from "express";
import { checkoutGuest } from "../controllers/checkoutController.js";

const router = express.Router();

router.put("/", checkoutGuest);

export default router;
