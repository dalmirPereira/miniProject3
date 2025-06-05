const express = require("express");
const router = express.Router();

const manageUserController = require("../controllers/userControllers");

//a POST request to register new book log.
router.post('/:userId', manageUserController.handleNewBookLog);

//a GET request to book log list.
router.get('/:userId', manageUserController.handleBookLogList);


module.exports = router;