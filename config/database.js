const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); 


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT CHECK(type IN ('income', 'expense')),
      category TEXT,
      amount REAL,
      date TEXT,
      description TEXT,
      userId INTEGER,
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);
});

module.exports = db;
