const sqlite3 = require('node:sqlite')
const db = new sqlite3.DatabaseSync('../db/database.db');

function createTables(){
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            student_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT,
            password_hash TEXT
        )
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS course (
            course_id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            credits INTEGER,
            description TEXT
        )
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS prereq (
            course_id TEXT,
            prereq_id TEXT,
            is_coreq INTEGER,
            min_grade TEXT,
            PRIMARY KEY (course_id, prereq_id),
            FOREIGN KEY (course_id) REFERENCES course(course_id),
            FOREIGN KEY (prereq_id) REFERENCES course(course_id)
        )
    `);

}
