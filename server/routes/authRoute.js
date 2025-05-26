const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

//a POST request to login user.
router.post('/', authController.handleLogin);

module.exports = router;
