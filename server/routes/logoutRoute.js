const express = require("express");
const router = express.Router();

const logoutController = require("../controllers/logoutController");

//a get request to logout.
router.get('/', logoutController.handleLogout);

module.exports = router;
