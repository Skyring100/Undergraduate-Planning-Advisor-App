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
    console.log("Creating tables");
    db.exec(`
        CREATE TABLE IF NOT EXISTS course (
            course_id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            credits INTEGER,
            description TEXT,
            department TEXT
        )
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS prereq (
            course_id TEXT,
            prereq_id TEXT,
            is_coreq BOOLEAN,
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
            degree_name TEXT,
            is_minor BOOLEAN
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS degree_course_requirement (
            degree_id INTEGER,
            course_id TEXT,
            min_grade TEXT,
            nesting INTEGER,
            FOREIGN KEY (degree_id) REFERENCES degree(degree_id)
        );
    `);
    db.exec(`
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
            student_id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT,
            gpa REAL,
            created_at TEXT,
            current_degree_plan_id INTEGER,
            current_degree_id INTEGER
        );
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS user_taking_degree(
            student_id TEXT,
            degree_id INTEGER,
            PRIMARY KEY (student_id, degree_id),
            FOREIGN KEY (student_id) REFERENCES user(student_id),
            FOREIGN KEY (degree_id) REFERENCES degree(degree_id)
        );
        CREATE TABLE IF NOT EXISTS user_completed_course(
            student_id TEXT,
            course_id INTEGER,
            in_progress BOOLEAN,
            grade TEXT,
            PRIMARY KEY (student_id, course_id),
            FOREIGN KEY (student_id) REFERENCES user(student_id),
            FOREIGN KEY (course_id) REFERENCES course(course_id)
        );
    `);

    //Degree planner related tables
    db.exec(`
        CREATE TABLE IF NOT EXISTS degree_plan (
            degree_plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT NOT NULL,
            degree_id INTEGER NOT NULL,
            degree_plan_name TEXT,
            created_at TEXT,
            
            FOREIGN KEY (student_id) REFERENCES user(student_id)
            FOREIGN KEY (degree_id) REFERENCES degree(degree_id)
        );
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS degree_plan_course (
            degree_plan_id INTEGER,
            year INTEGER,
            semester_id INTEGER,
            course_id TEXT,

            PRIMARY KEY (degree_plan_id, year, semester_id, course_id),
            FOREIGN KEY (degree_plan_id) REFERENCES degree_plan(degree_plan_id),
            FOREIGN KEY (course_id) REFERENCES course(course_id),

            CONSTRAINT check_only_valid_semesters CHECK (
                semester_id IN (09, 01, 05))
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
    `);
}

function dummyData(){
    db.exec(`
        INSERT INTO section(crn, course_id, days_of_week, start_time, end_time, start_date, end_date) VALUES (1, 'CPSC100','MWF', '08:00', '09:20', '2026/03/16', '2026/05/27'), (2, 'CPSC101', 'TR', '09:30', '10:50', '2026/03/16', '2026/05/27')
    `);
    db.exec(`
        INSERT OR REPLACE INTO degree(degree_id, degree_name, is_minor) VALUES
            (1, 'Computer Science', FALSE),
            (2, 'Mathematics', FALSE)
    `);
    // this will change if test@test.com's user id changes
    db.exec(`
        INSERT OR REPLACE INTO degree_plan(degree_plan_id, degree_id, student_id, degree_plan_name) VALUES
            (1, 1, 'vG2OQvppE5fs0SDP9THGUF01aOq2', 'Computer Science'),
            (2, 2, 'vG2OQvppE5fs0SDP9THGUF01aOq2', 'Mathematics')
    `);
    db.exec(`
        INSERT OR REPLACE INTO degree_plan_course(degree_plan_id, year, semester_id, course_id) VALUES
            (1, 2024, 9, 'CPSC100'),
            (1, 2024, 9, 'CPSC141'),
            (1, 2025, 1, 'CPSC101'),
            (1, 2025, 9, 'CPSC230'),
            (1, 2026, 1, 'CPSC231'),
            (1, 2026, 1, 'ENGL270'),
            (1, 2026, 5, 'CPSC321'),
            (1, 2026, 9, 'CPSC300'),
            (1, 2026, 9, 'CPSC320'),
            (1, 2027, 1, 'CPSC444')
    `);

    // dummy data for degree courses
    db.exec(`
        INSERT INTO degree_course_requirement VALUES 
            (1, 'CPSC100', 'C-', 1),
            (1, 'CPSC101', 'C-', 1),
            (1, 'CPSC141', 'C-', 1),
            (1, 'ENGL170', 'C-', 2),
            (1, 'ENGL270', 'C-', 1),
            (1, 'MATH100', 'C-', 1),
            (1, 'CPSC224', 'C-', 1),
            (1, 'CPSC230', 'C-', 1),
            (1, 'CPSC231', 'C-', 1),
            (1, 'CPSC260', 'C-', 1),
            (1, 'CPSC281', 'C-', 1),
            (1, 'MATH220', 'C-', 1),
            (1, 'CPSC300', 'C-', 1),
            (1, 'CPSC320', 'C-', 1),
            (1, 'CPSC321', 'C-', 1),
            (1, 'CPSC340', 'C-', 1),
            (1, 'CPSC344', 'C-', 2),
            (1, 'CPSC444', 'C-', 1),
            (1, 'CPSC4XX', 'C-', 1),
            (1, 'CPSC4XX', 'C-', 1),
            (1, 'CPSC4XX', 'C-', 1),
            (1, 'CPSC4XX', 'C-', 1),
            (2, 'ENGL170', 'C-', 2),
            (2, 'ENGL270', 'C-', 1),
            (2, 'CPSC100', 'C-', 1),
            (2, 'CPSC141', 'C-', 1),
            (2, 'MATH100', 'C-', 1),
            (2, 'MATH101', 'C-', 1),
            (2, 'MATH202', 'C-', 1),
            (2, 'MATH204', 'C-', 1),
            (2, 'MATH220', 'C-', 1),
            (2, 'MATH224', 'C-', 1),
            (2, 'MATH230', 'C-', 1),
            (2, 'MATH301', 'C-', 1),
            (2, 'MATH302', 'C-', 1),
            (2, 'MATH320', 'C-', 1),
            (2, 'MATH335', 'C-', 2),
            (2, 'MATH336', 'C-', 1),
            (2, 'STAT371', 'C-', 1),
            (2, 'STAT372', 'C-', 1),
            (2, 'MATH326', 'C-', 2),
            (2, 'MATH405', 'C-', 1),
            (2, 'MATH4XX', 'C-', 1),
            (2, 'MATH4XX', 'C-', 1),
            (2, 'MATH4XX', 'C-', 1),
            (2, 'MATH4XX', 'C-', 1);
    `);

    db.exec(`
        INSERT OR REPLACE INTO degree_credit_requirement VALUES
            (1, 1, '400-Level Courses', 12);
    `);

    db.exec(`
        INSERT OR REPLACE INTO user_taking_degree VALUES
            ('vG2OQvppE5fs0SDP9THGUF01aOq2', 1);
    `);


    db.exec(`
        INSERT OR REPLACE INTO user_completed_course VALUES
            ('vG2OQvppE5fs0SDP9THGUF01aOq2', 'CPSC100', 0, 'B+'),
            ('vG2OQvppE5fs0SDP9THGUF01aOq2', 'CPSC141', 0, 'B+'),
            ('vG2OQvppE5fs0SDP9THGUF01aOq2', 'CPSC101', 0, 'B+'),
            ('vG2OQvppE5fs0SDP9THGUF01aOq2', 'CPSC281', 1, 'B+')
    `);
    
    /*

gen sci requirements and electives for CPSC:
            (1, 'CPSC1XX', 'C-', 2),
            (1, 'CPSC2XX', 'C-', 2),
            (1, 'CPSC3XX', 'C-', 2),
            (1, 'CPSC4XX', 'C-', 2),
            (1, 'MATH335', 'C-', 2),
            (1, 'STAT371', 'C-', 1),
            (1, 'CPSC1XX', 'C-', 2),
            (1, 'CPSC2XX', 'C-', 2),
            (1, 'CPSC3XX', 'C-', 2),
            (1, 'CPSC4XX', 'C-', 2),
            (1, 'MATH335', 'C-', 2),
            (1, 'STAT371', 'C-', 1),
            (1, 'CPSC1XX', 'C-', 2),
            (1, 'CPSC2XX', 'C-', 2),
            (1, 'CPSC3XX', 'C-', 2),
            (1, 'CPSC4XX', 'C-', 2),
            (1, 'MATH335', 'C-', 2),
            (1, 'STAT371', 'C-', 1),
            (1, 'BIOL103', 'C-', 2),
            (1, 'BIOL104', 'C-', 2),
            (1, 'CHEM100', 'C-', 2),
            (1, 'CHEM101', 'C-', 2),
            (1, 'ENVS101', 'C-', 2),
            (1, 'GEOG204', 'C-', 2),
            (1, 'GEOG205', 'C-', 2),
            (1, 'GEOG210', 'C-', 2),
            (1, 'PHYS100', 'C-', 2),
            (1, 'PHYS101', 'C-', 2),
            (1, 'PHYS110', 'C-', 2),
            (1, 'PHYS111', 'C-', 2),
            (1, 'PSYC101', 'C-', 1),
            (1, 'BIOL103', 'C-', 2),
            (1, 'BIOL104', 'C-', 2),
            (1, 'CHEM100', 'C-', 2),
            (1, 'CHEM101', 'C-', 2),
            (1, 'ENVS101', 'C-', 2),
            (1, 'GEOG204', 'C-', 2),
            (1, 'GEOG205', 'C-', 2),
            (1, 'GEOG210', 'C-', 2),
            (1, 'PHYS100', 'C-', 2),
            (1, 'PHYS101', 'C-', 2),
            (1, 'PHYS110', 'C-', 2),
            (1, 'PHYS111', 'C-', 2),
            (1, 'PSYC101', 'C-', 1),

" for MATH:
            (2, 'BIOL103', 'C-', 2),
            (2, 'BIOL104', 'C-', 2),
            (2, 'CHEM100', 'C-', 2),
            (2, 'CHEM101', 'C-', 2),
            (2, 'PHYS100', 'C-', 2),
            (2, 'PHYS101', 'C-', 2),
            (2, 'PHYS111', 'C-', 1),
            (2, 'BIOL103', 'C-', 2),
            (2, 'BIOL104', 'C-', 2),
            (2, 'CHEM100', 'C-', 2),
            (2, 'CHEM101', 'C-', 2),
            (2, 'PHYS100', 'C-', 2),
            (2, 'PHYS101', 'C-', 2),
            (2, 'PHYS111', 'C-', 1)
     */
}

export function getDatabaseConnection(){
    return db;
}
