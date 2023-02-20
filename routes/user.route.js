const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

//create a user
router.post("/", UserController.createUser);
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUserById);
router.post("/login", UserController.login);

module.exports = router;