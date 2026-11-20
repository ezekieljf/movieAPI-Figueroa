const express = require('express');
const movieController = require('../controllers/movie');
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

// Any User
router.get("/getMovies", movieController.getMovies);
router.get("/getMovie/:movieId", movieController.getMovie);

// Authenticated Users
router.patch("/addComment/:movieId", verify, movieController.addComment);
router.get("/getComments/:movieId", verify, movieController.getComments);

// Admin
router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.patch("/updateMovie/:movieId", verify, verifyAdmin, movieController.updateMovie);
router.delete("/deleteMovie/:movieId", verify, verifyAdmin, movieController.deleteMovie);

module.exports = router;