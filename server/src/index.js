const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to droptext");
});

app.post("/create", (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      throw new Error("Content missing");
    } else {
      res.json({ message: "OK!" });
    }
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log("Error :" + err);
  res.status(400).json({
    message: err.message,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
