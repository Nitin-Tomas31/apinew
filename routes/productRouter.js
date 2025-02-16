const express = require("express");
const router = express.Router();
const movies = require("../products");

router.get("/", (req, res) => {
  res.status(200).json(movies);
});

router.get("/:id", (req, res) => {
  const movieID = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieID);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.status(200).json(movie);
});

module.exports = router;
