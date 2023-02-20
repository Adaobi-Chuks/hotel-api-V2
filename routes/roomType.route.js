const {addRoomType, getAllRoomTypes, deleteRoomTypeById} = require('../controllers/roomType.controller');
const express = require('express');
const router = express.Router();
const {authenticate} = require("../middlewares/authentication.middleware");
const {authorizeAdmin} = require("../middlewares/authorization.middleware");

//create a room type
router.post("/", addRoomType);

//Get all room types
router.get("/", getAllRoomTypes);

//Delete a room type using Id
router.delete("/:id", authenticate, authorizeAdmin, deleteRoomTypeById);

module.exports = router;