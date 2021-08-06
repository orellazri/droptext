const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "welcome to droptext" });
});

app.post("/create", (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) throw new Error("Content missing");
    if (!content.trim()) throw new Error("Content missing");

    res.json({ message: "OK!" });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
