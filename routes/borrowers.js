
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/borrowers
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM borrower");
  res.json(rows);
});

// POST /api/borrowers
router.post("/", async (req, res) => {
  const { fname, lname, streetAddress } = req.body;

  const [result] = await db.query(
    "INSERT INTO borrower (fname, lname, streetAddress) VALUES (?, ?, ?)",
    [fname, lname, streetAddress]
  );

  res.status(201).json({
    id_borrower: result.insertId,
    fname,
    lname,
    streetAddress,
  });
});

// PUT /api/borrowers/:id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { fname, lname, streetAddress } = req.body;

  const [result] = await db.query(
    "UPDATE borrower SET fname = ?, lname = ?, streetAddress = ? WHERE id_borrower = ?",
    [fname, lname, streetAddress, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Borroweria ei löytynyt" });
  }

  res.json({ ok: true });
});

// DELETE /api/borrowers/:id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const [result] = await db.query(
    "DELETE FROM borrower WHERE id_borrower = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Borroweria ei löytynyt" });
  }

  res.json({ ok: true });
});

module.exports = router;
