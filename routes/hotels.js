import express from "express";
import {
  countByCity,
  countByType,
  countHotels,
  countRooms,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
const router = express.Router();

//CREATE
router.post("/",  createHotel);

//UPDATE
router.put("/:id",  updateHotel);
//DELETE
router.delete("/:id",  deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.get("/countAll", countHotels)
router.get("/countRoom", countRooms)

export default router;
