const express = require("express");
const path = require("path");
const app = express();
const productRouter = require("./routes/productRouter");

app.use("/books", productRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
