const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const { handleBookList } = require("../controllers/bookControllers");

router.get("/", verifyJWT, handleBookList); // No role protection

module.exports = router;
