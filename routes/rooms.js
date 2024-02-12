import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";

const router = express.Router();
//CREATE
router.post("/:hotel", createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id",  updateRoom);
//DELETE
router.delete("/:id/:hotelid", deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

export default router;
