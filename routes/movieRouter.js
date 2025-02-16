const express = require("express");
const router = express.Router();
let movies = require("../products");

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

router.post("/", (req, res) => {
  const { title, genre, releaseYear, rating } = req.body;

  if (!title || !genre || !releaseYear || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newMovie = {
    id: movies.length + 1,
    title,
    genre,
    releaseYear,
    rating,
  };

  movies.push(newMovie);
  res
    .status(201)
    .json({ message: "Movie added successfully", movie: newMovie });
});

router.patch("/:id", (req, res) => {
  const movieID = parseInt(req.params.id);
  const { rating } = req.body;
  const movie = movies.find((m) => m.id === movieID);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  if (!rating) {
    return res.status(400).json({ message: "Rating is required" });
  }

  movie.rating = rating;
  res.status(200).json({ message: "Movie rating updated", movie });
});

router.delete("/:id", (req, res) => {
  const movieID = parseInt(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === movieID);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  res.status(200).json({ message: "Movie deleted successfully" });
});

module.exports = router;
