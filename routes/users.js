
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// POST /api/users
router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO user (username, password_hash) VALUES (?, ?)",
      [username, passwordHash]
    );

    res.status(201).json({
      id_user: result.insertId,
      username
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT id_user, username, password_hash FROM user"
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
