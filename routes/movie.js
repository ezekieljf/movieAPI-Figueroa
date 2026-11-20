const express = require('express');
const movieController = require('../controllers/movie');
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.get("/getMovies", movieController.getMovies);
router.get("/getMovie/:movieId", movieController.getMovie);

router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);

module.exports = router;