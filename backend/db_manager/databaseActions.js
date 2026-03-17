import { DatabaseSync } from "node:sqlite";
const DATABASE_PATH = './db/database.db';
const db = initalizeDatabase();
//Temporary reset for database for testing purposes
dropTables();
createTables();
dummyData();

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
    // days_of_week example: 'MWF' for Monday, Wednesday, Friday or 'TR' for Tuesday, Thursday
    db.exec(`
        CREATE TABLE IF NOT EXISTS section (
            crn INTEGER PRIMARY KEY,
            course_id TEXT NOT NULL,
            days_of_week TEXT,
            start_time TEXT,
            end_time TEXT,
            start_date TEXT,
            end_date TEXT,
            building TEXT,
            room_number INTEGER,
            instructor_name TEXT,

            CHECK (start_time GLOB '[0-9][0-9]:[0-9][0-9]' AND end_time GLOB '[0-9][0-9]:[0-9][0-9]'),
            CHECK (start_date GLOB '[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]' AND end_date GLOB '[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]' ),           
            
            FOREIGN KEY (course_id) REFERENCES course(course_id)
        )
    `);
}

function dropTables(){
    db.exec(`
        DROP TABLE IF EXISTS section;
        DROP TABLE IF EXISTS prereq;
        DROP TABLE IF EXISTS course;
        DROP TABLE IF EXISTS user;
    `);
}

function dummyData(){
    db.exec(`
        INSERT INTO course(course_id, title, credits, description) VALUES ('CPSC100', 'Programming 1', 3, 'Basic Java'), ('CPSC101', 'Programming 2', 3, 'Advanced Java')
    `);
    db.exec(`
        INSERT INTO section(crn, course_id, days_of_week, start_time, end_time, start_date, end_date) VALUES (1, 'CPSC100','MWF', '08:00', '09:20', '2026/03/16', '2026/05/27'), (2, 'CPSC101', 'TR', '09:30', '10:50', '2026/03/16', '2026/05/27')
    `);
}

export function getDatabaseConnection(){
    return db;
}