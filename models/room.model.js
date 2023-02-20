const {model, Schema, Types} = require('mongoose');
const {DATABASES} = require("../constants/constants");

const RoomSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  roomType: {
    type: Types.ObjectId,
    ref: DATABASES.ROOMTYPE,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  floor: {
    type: Number,
    required: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: false
  },
  amenities: {
    type: [String],
    required: false
  },
  booked: {
    type: Boolean,
    default: false,
    required: false
  }
});

const Room = model(DATABASES.ROOM, RoomSchema);
module.exports = Room;