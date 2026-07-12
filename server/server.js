const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary database
let items = [];

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// Get All Items
app.get("/items", (req, res) => {
  res.json(items);
});

// Add Item
app.post("/items", (req, res) => {
  const newItem = req.body;

  items.push(newItem);

  res.json({
    message: "Item Added Successfully",
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});