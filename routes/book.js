import express from "express";
import { createBooking, deleteBooking, getBooking, countBooking } from "../controllers/book.js";
const router = express.Router();
router.post("/", createBooking);
router.get("/", getBooking);
router.delete("/:id", deleteBooking)
router.get("/countBooking", countBooking)

export default router;