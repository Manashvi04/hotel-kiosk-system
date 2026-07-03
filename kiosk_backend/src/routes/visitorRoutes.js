import express from "express";
import {
  createVisitor,
  checkoutVisitor,
} from "../controllers/visitorController.js";

const router = express.Router();

router.post("/", createVisitor);

router.put("/checkout", checkoutVisitor);

export default router;
