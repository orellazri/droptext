const express = require("express");
const cors = require("cors");
const levelup = require("levelup");
const leveldown = require("leveldown");
const { nanoid } = require("nanoid");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = levelup(leveldown("./db"));

app.get("/", (req, res) => {
  res.json({ message: "welcome to droptext" });
});

app.post("/create", async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) throw new Error("Content missing");
    if (!content.trim()) throw new Error("Content missing");

    let id = nanoid(10);

    // Keep generating id if it's not unique
    while (1) {
      try {
        const getId = await db.get(id);
        id = nanoid(10);
      } catch (e) {
        break;
      }
    }

    db.put(id, content, (err) => {
      if (err) {
        throw new Error("Could not insert to dabatase");
      }
    });

    res.json({ id });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(400).json({
    error: process.env.NODE_ENV === "production" ? "An error occured" : err.message,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
