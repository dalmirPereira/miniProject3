const express = require("express");
const router = express.Router();

const manageAdminController = require("../controllers/adminControllers");

//---------------------------------BOOKS' MANAGEMENT ROUTES------------------------------------
//a POST request to register new book.
router.post('/', manageAdminController.handleNewBook);

//a put request to update book.
router.put('/:id', manageAdminController.handleUpdateBook);

//a delete request to delete book.
router.delete('/:id', manageAdminController.handleDeleteBook);
//---------------------------------------------------------------------------------------------

//---------------------------------RETURNS MANAGEMENT ROUTES------------------------------------
//a GET request to borrowed books.
router.get('/returns', manageAdminController.handleBorrowedBooks);

//a PUT request to return book.
router.put('/returns/:userId', manageAdminController.handleReturnBook);
//---------------------------------------------------------------------------------------------

module.exports = router;