const express = require("express");
const router = express.Router();

const manageBookController = require("../controllers/bookControllers");

//a POST request to register new book.
router.post('/', manageBookController.handleNewBook);

//a GET request to book list.
router.get('/', manageBookController.handleBookList);

//a put request to update book.
router.put('/:id', manageBookController.handleUpdateBook);

//a delete request to delete book.
router.delete('/:id', manageBookController.handleDeleteBook);

module.exports = router;