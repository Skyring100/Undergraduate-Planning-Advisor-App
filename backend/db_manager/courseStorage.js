import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getCourseById(id) {

    const course = db.prepare('SELECT * FROM course JOIN prereqs ON course.course_id = prereqs.course_id WHERE course.id=? ').get(id);

    return course;
}

// added this to get all courses
export function getAllCourses()
{
    const courses = db.prepare('SELECT * FROM course').all();

    return courses;
}