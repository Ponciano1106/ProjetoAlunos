const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "..", "alunos.db"));

db.pragma("journal_mode = WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER NOT NULL,
        email TEXT NOT NULL UNIQUE
    )
`);

module.exports = db;
