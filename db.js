// db.js
// Luo MySQL-yhteyspoolin (promise-versio), jotta voidaan käyttää async/await:ia.
// Pool tarkoittaa, että yhteyksiä kierrätetään tehokkaasti eikä avata uutta joka pyynnöllä.
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,     // Tietokannan osoite (.env)
  user: process.env.DB_USER,     // Käyttäjätunnus (.env)
  password: process.env.DB_PASS, // Salasana (.env)
  database: process.env.DB_NAME, // Tietokannan nimi (.env)
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool; // Viedään pool käyttöön muille tiedostoille
