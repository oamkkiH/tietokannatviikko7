
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET kaikki opiskelijat
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM student");
  res.json(rows);
});

// POST uusi opiskelija
router.post("/", async (req, res) => {
  const { fname, lname, email } = req.body;

  const [result] = await db.query(
    "INSERT INTO student (fname, lname, email) VALUES (?, ?, ?)",
    [fname, lname, email]
  );

  res.status(201).json({ id_student: result.insertId });
});

// PUT päivitä opiskelija
router.put("/:id", async (req, res) => {
  const { fname, lname, email } = req.body;

  await db.query(
    "UPDATE student SET fname=?, lname=?, email=? WHERE id_student=?",
    [fname, lname, email, req.params.id]
  );

  res.json({ ok: true });
});

// DELETE poista opiskelija
router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM student WHERE id_student=?", [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
