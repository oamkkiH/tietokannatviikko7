
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM grade");
  res.json(rows);
});

// POST
router.post("/", async (req, res) => {
  const { id_student, id_course, grade } = req.body;

  const [result] = await db.query(
    "INSERT INTO grade (id_student, id_course, grade) VALUES (?, ?, ?)",
    [id_student, id_course, grade]
  );

  res.status(201).json({ id_grade: result.insertId });
});

// PUT
router.put("/:id", async (req, res) => {
  const { grade } = req.body;

  await db.query(
    "UPDATE grade SET grade=? WHERE id_grade=?",
    [grade, req.params.id]
  );

  res.json({ ok: true });
});

// DELETE
router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM grade WHERE id_grade=?", [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
