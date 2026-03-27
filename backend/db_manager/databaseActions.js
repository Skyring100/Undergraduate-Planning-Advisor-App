import { DatabaseSync } from "node:sqlite";
const DATABASE_PATH = './db/database.db';
const db = initalizeDatabase();
//Temporary reset for database for testing purposes
dropTables();
createTables();
// dummyData();

function initalizeDatabase(){
    return new DatabaseSync(DATABASE_PATH);
}

function createTables(){
    console.log("Creating tables");
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
            nesting INTEGER,
            ordering INTEGER,
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
    
    //Degree requirement related tables
    db.exec(`
        CREATE TABLE IF NOT EXISTS degree (
            degree_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            is_minor INTEGER,
            CHECK (is_minor == 1 OR is_minor == 0)
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS degree_course_requirement (
            degree_id INTEGER,
            course_id TEXT,
            min_grade TEXT,
            PRIMARY KEY (degree_id, course_id),
            FOREIGN KEY (degree_id) REFERENCES degree(degree_id),
            FOREIGN KEY (course_id) REFERENCES course(course_id)
        );
        CREATE TABLE IF NOT EXISTS degree_credit_requirement (
            degree_id INTEGER,
            credit_requirement_id INTEGER,
            description TEXT,
            num_credits INTEGER,
            PRIMARY KEY (degree_id, credit_requirement_id),
            FOREIGN KEY (degree_id) REFERENCES degree(degree_id)
        ); 
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS user (
            student_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT,
            password_hash TEXT,
            gpa REAL
        );
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS user_taking_degree(
            student_id INTEGER,
            degree_id INTEGER,
            PRIMARY KEY (student_id, degree_id),
            FOREIGN KEY (student_id) REFERENCES user(student_id),
            FOREIGN KEY (degree_id) REFERENCES degree(degree_id)
        );
        CREATE TABLE IF NOT EXISTS user_completed_course(
            student_id INTEGER,
            course_id INTEGER,
            in_progress BOOLEAN,
            PRIMARY KEY (student_id, course_id),
            FOREIGN KEY (student_id) REFERENCES user(student_id),
            FOREIGN KEY (course_id) REFERENCES course(course_id)
        );
    `);

    //User Degree table
    db.exec(`
        CREATE TABLE IF NOT EXISTS user_degree(
            student_id INTEGER,
            degree_id INTEGER,

            PRIMARY KEY (student_id, degree_id)
            FOREIGN KEY (student_id) REFERENCES user(student_id),
            FOREIGN KEY (degree_id) REFERENCES degree(degree_id)
        );
    `);

    //Degree planner related tables
    db.exec(`
        CREATE TABLE IF NOT EXISTS degree_plan (
            degree_plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            name TEXT,
            
            FOREIGN KEY (student_id) REFERENCES user(student_id)
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS degree_plan_degree (
            degree_plan_id INTEGER PRIMARY KEY,
            degree_id INTEGER,

            FOREIGN KEY (degree_plan_id) REFERENCES degree_plan(degree_plan_id),
            FOREIGN KEY (degree_id) REFERENCE degree(degree_id)
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS degree_plan_course (
            degree_plan_id INTEGER,
            year_num INTEGER,
            semester_id INTEGER,
            course_id INTEGER,

            PRIMARY KEY (degree_plan_id, year_num, semester_name, course_id),
            FOREIGN KEY (degree_plan_id) REFERENCES degree_plan(degree_plan_id),
            FOREIGN KEY (course_id) REFERENCES course(course_id)

            CONSTRAINT check_only_valid_semesters CHECK (
                semester_id IN (09, 01, 05)),
        );
    `);
}

function dropTables(){
    console.log("Dropping tables");
    // We will NOT drop course table since it contains all web scraped data
    db.exec(`
        DROP TABLE IF EXISTS degree_plan_course;
        DROP TABLE IF EXISTS degree_plan_degree;
        DROP TABLE IF EXISTS degree_plan;
        DROP TABLE IF EXISTS user_degree;
        DROP TABLE IF EXISTS user_taking_degree;
        DROP TABLE IF EXISTS user_completed_course;
        DROP TABLE IF EXISTS degree_course_requirement;
        DROP TABLE IF EXISTS degree_credit_requirement;
        DROP TABLE IF EXISTS degree;
        DROP TABLE IF EXISTS section;
        DROP TABLE IF EXISTS prereq;
        DROP TABLE IF EXISTS user;
    `);
}

function dummyData(){
    db.exec(`
        INSERT INTO course(course_id, title, credits, description) VALUES ('CPSC100', 'Programming 1', 3, 'Basic Java'), ('CPSC101', 'Programming 2', 3, 'Advanced Java'), ('CPSC141', 'Discrete Math', 3, 'Lots of cpsc math'), ('CPSC230', 'Computer Arch', 3, 'Assembly stuff'), ('CPSC231', 'Computer Arch 2', 3, 'More assembly stuff'), ('ENGL270', 'English 2', 3, 'Basic English'), ('CPSC300', 'Programming 3', 3, 'Advanced Java'), ('CPSC320', 'Databases 1', 3, 'Introduction to Databases'), ('CPSC321', 'Databases 2', 3, 'More Databases'), ('CPSC444', 'Computer Arch 4', 3, 'More assembly stuff')
    `);
    db.exec(`
        INSERT INTO section(crn, course_id, days_of_week, start_time, end_time, start_date, end_date) VALUES (1, 'CPSC100','MWF', '08:00', '09:20', '2026/03/16', '2026/05/27'), (2, 'CPSC101', 'TR', '09:30', '10:50', '2026/03/16', '2026/05/27')
    `);
}

export function getDatabaseConnection(){
    return db;
}
