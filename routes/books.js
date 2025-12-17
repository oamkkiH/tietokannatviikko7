// routes/books.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/books
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM book");
  res.json(rows);
});

// POST /api/books
router.post("/", async (req, res) => {
  const { name, author, isbn } = req.body;

  const [result] = await db.query(
    "INSERT INTO book (name, author, isbn) VALUES (?, ?, ?)",
    [name, author, isbn]
  );

  res.status(201).json({
    id_book: result.insertId,
    name,
    author,
    isbn,
  });
});

// PUT /api/books/:id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, author, isbn } = req.body;

  const [result] = await db.query(
    "UPDATE book SET name = ?, author = ?, isbn = ? WHERE id_book = ?",
    [name, author, isbn, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Kirjaa ei löytynyt" });
  }

  res.json({ ok: true });
});

// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const [result] = await db.query(
    "DELETE FROM book WHERE id_book = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Kirjaa ei löytynyt" });
  }

  res.json({ ok: true });
});

module.exports = router;
