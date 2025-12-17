// app.js
// Express-sovellus: reititys + body-parserit + .env + käynnistys

const express = require("express");

// Lataa .env-tiedoston arvot process.env-muuttujiin.
// Tämä täytyy tehdä ennen kuin db.js (MySQL) käyttää process.env arvoja.
require("dotenv").config();

const app = express();

/**
 * Body-parserit (TÄRKEÄ järjestys):
 * Nämä pitää olla ennen reittejä, jotta req.body täyttyy.
 */

// Parsii JSON-bodyn: Content-Type: application/json
app.use(express.json());

// Parsii x-www-form-urlencoded bodyn: Content-Type: application/x-www-form-urlencoded
// extended:false = yksinkertainen parseri (riittää tähän kurssiin)
app.use(express.urlencoded({ extended: false }));

/**
 * Reitit
 * Reittitiedostot löytyvät routes/ kansiosta.
 */
const booksRouter = require("./routes/books");
app.use("/api/books", booksRouter);

// Tulostetaan mitkä reitit booksRouterissa on oikeasti rekisteröity
console.log(
  "BOOKS ROUTES:",
  booksRouter.stack
    .filter((l) => l.route)
    .map((l) => `${Object.keys(l.route.methods).join(",").toUpperCase()} ${l.route.path}`)
);


app.use("/api/borrowers", require("./routes/borrowers"));
app.use("/api/users", require("./routes/users"));

/**
 * Yleinen virhekäsittelijä:
 * Jos async-reiteissä tulee virhe, Express voi päätyä palauttamaan HTML-virhesivun.
 * Tämä muuttaa virheen JSONiksi (helpompi Postman-testauksessa).
 */
app.use((err, req, res, next) => {
  console.error("Virhe:", err);
  res.status(500).json({ error: "Palvelinvirhe", details: err.message });
});

/**
 * Käynnistys
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä: http://localhost:${PORT}`);
});
