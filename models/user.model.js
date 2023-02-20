const mongoose = require('mongoose');
const {model, Schema} = mongoose;
const {ENUM, DATABASES} = require("../constants/constants");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    fullName: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 100, 
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 60
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    nationality: {
        type: String, 
        required: true, 
        trim: true
    },
    role: {
        type: String,
        enum: [ENUM.GUEST, ENUM.ADMIN],
        default: ENUM.GUEST,
        lowercase: true,
        required: true
    },
}, { 
    timestamps: true
});

userSchema.pre('save', async function (next) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    // if (this.isModified('password') || this.isNew) {
    // }
    next();
});

const User = model(DATABASES.USER, userSchema);
module.exports = User;