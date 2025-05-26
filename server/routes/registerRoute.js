const express = require("express");
const router = express.Router();

const registerControllers = require("../controllers/registerController");

//a POST request to register new user.
router.post('/', registerControllers.handleNewUser);

module.exports = router;
