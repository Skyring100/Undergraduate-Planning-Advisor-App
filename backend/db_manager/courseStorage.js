const sqlite3 = require('node:sqlite')
const db = new sqlite3.DatabaseSync('../db/database.db');


export function getCourseById(id) {

    const course = db.prepare('SELECT * FROM course WHERE course.id=?').get(id);
    const prereq = db.prepare('SELECT * FROM prereq WHERE course_id=?').all(id);
    const response = {
        course_id: course.course_id,
        title: course.title,
        credits: course.credits,
        description: course.description,
        prereqs : prereq
    };
    return response;
}