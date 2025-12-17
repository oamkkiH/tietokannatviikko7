
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM course");
  res.json(rows);
});

// POST
router.post("/", async (req, res) => {
  const { name, credits } = req.body;

  const [result] = await db.query(
    "INSERT INTO course (name, credits) VALUES (?, ?)",
    [name, credits]
  );

  res.status(201).json({ id_course: result.insertId });
});

// PUT
router.put("/:id", async (req, res) => {
  const { name, credits } = req.body;

  await db.query(
    "UPDATE course SET name=?, credits=? WHERE id_course=?",
    [name, credits, req.params.id]
  );

  res.json({ ok: true });
});

// DELETE
router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM course WHERE id_course=?", [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
