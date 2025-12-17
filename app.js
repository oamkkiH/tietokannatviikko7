
// Express-sovellus: reititys + body-parserit + .env + käynnistys

const express = require("express");

// Lataa .env-tiedoston arvot process.env-muuttujiin.
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//Reitit
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

// Tehtävä 21 reitit 
app.use("/api/students", require("./routes/students"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/grades", require("./routes/grades"));


// Error handler

app.use((err, req, res, next) => {
  console.error("Virhe:", err);
  res.status(500).json({ error: "Palvelinvirhe", details: err.message });
});

//Käynnistys

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä: http://localhost:${PORT}`);
});
