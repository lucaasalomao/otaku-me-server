/* const { Router } = require("express");

const Room = require("../models/Room.model");
const Review = require("../models/Review.model");

const router = Router();

router.post("/", async (req, res) => {
  const { id } = req.user;
  try {
    const room = await Room.create({ ...req.body, userId: id });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error trying to create a room", error });
  }
})

router.get("/all", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error trying to get all rooms", error });
  }
})

router.put("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    res.status(200).json({ message: "Deleted a room and it's reviews" })
  } catch (error) {
    res.status(500).json({ message: "Error trying to delete a room", error })
  }
})

router.delete("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    res.status(200).json({ message: "Deleted a room and it's reviews" })
  } catch (error) {
    res.status(500).json({ message: "Error trying to delete a room", error })
  }
}) */
