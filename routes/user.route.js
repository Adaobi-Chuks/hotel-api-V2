const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const {validateUser} = require("../middlewares/userValidation.middleware");
const {authenticate} = require("../middlewares/authentication.middleware");

//create a user or signup
router.post("/signup", validateUser, UserController.createUser);
//get users
router.get("/", UserController.getUsers);
//get a user
router.get("/:id", UserController.getUserById);
//edit any user details
router.patch("/:id", authenticate, validateUser, UserController.editUser);
//delete user
router.delete("/:id", authenticate, UserController.deleteUserById);
//login user
router.post("/login", validateUser, UserController.login);

module.exports = router;