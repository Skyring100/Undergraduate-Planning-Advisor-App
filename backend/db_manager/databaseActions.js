import { DatabaseSync } from "node:sqlite";
const DATABASE_PATH = './db/database.db';
const db = initalizeDatabase();
createTables();

function initalizeDatabase(){
    return new DatabaseSync(DATABASE_PATH);
}

function createTables(){
    db.exec(`
        CREATE TABLE IF NOT EXISTS user (
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

export function getDatabaseConnection(){
    return db;
}