const {addRoom, getRoomById, getAllRooms, editRoomById, deleteRoomById} = require('../controllers/room.controller');
const express = require('express');
const router = express.Router();

//create a room
router.post("/", addRoom);

//get room using id
router.get("/:id", getRoomById);

//get all rooms with some queries
router.get("/", getAllRooms);

//edit room details with id
router.patch("/:id", editRoomById);

//deleting a room details with an id
router.delete("/:id", deleteRoomById);

module.exports = router;