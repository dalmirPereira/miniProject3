const express = require("express");
const router = express.Router();

const refreshTokenController = require("../controllers/refreshTokenController");

//a get request to refresh access token.
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;
