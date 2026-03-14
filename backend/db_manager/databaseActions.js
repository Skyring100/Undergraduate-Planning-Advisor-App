import { DatabaseSync } from "node:sqlite";
const DATABASE_PATH = './db/database.db';
const db = initalizeDatabase();
//Temporary reset for database for testing purposes
dropTables();
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
    
    db.exec(`
        CREATE TABLE IF NOT EXISTS section (
            crn INTEGER PRIMARY KEY,
            course_id TEXT NOT NULL,
            start_time TEXT,
            end_time TEXT,
            start_date TEXT,
            end_date TEXT,
            building TEXT,
            room_number INTEGER,
            instructor_name TEXT,

            CHECK (start_time GLOB '[0-9][0-9]:[0-9][0-9]' AND end_time GLOB '[0-9][0-9]:[0-9][0-9]'),
            CHECK (start_date GLOB '[0-9][0-9][0-9][0-9]:[0-9][0-9]:[0-9][0-9]' AND end_date GLOB '[0-9][0-9][0-9][0-9]:[0-9][0-9]:[0-9][0-9]' ),           
            FOREIGN KEY (course_id) REFERENCES course(course_id)
        )
    `);
}

function dropTables(){
    db.exec(`
        DROP TABLE IF EXISTS user;
        DROP TABLE IF EXISTS prereq;
        DROP TABLE IF EXISTS course;
        DROP TABLE IF EXISTS section;
        `
    );
}

export function getDatabaseConnection(){
    return db;
}