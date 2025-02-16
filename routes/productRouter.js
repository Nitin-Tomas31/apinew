const express = require("express");
const router = express.Router();
const products = require("../products");

router.get("/", (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: "products not available" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const productID = parseInt(req.params.id);
    const product = products.find((product) => product.id === productID);
    if (!product) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(404).json({ message: "error occured" });
  }
});

module.exports = router;
