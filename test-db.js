
// Lataa .env-tiedoston arvot process.env-muuttujiin.
require("dotenv").config();

const db = require("./db");

(async () => {
  try {
    // Testikysely: jos tämä onnistuu, yhteys tietokantaan toimii.
    const [rows] = await db.query("SELECT 1 AS ok");
    console.log(rows); // Odotettu: [ { ok: 1 } ]
    process.exit(0);
  } catch (err) {
    // Jos tulee virhe, tulostetaan selkeä viesti.
    console.error("DB TESTI EPÄONNISTUI:", err.message);
    process.exit(1);
  }
})();
