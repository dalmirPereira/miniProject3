const express = require("express");
const router = express.Router();

const manageBookController = require("../controllers/bookController");

//a GET request to book list.
router.get('/', manageBookController.handleBookList);

module.exports = router;