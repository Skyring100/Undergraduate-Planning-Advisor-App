import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getCourseById(id) {

    const course = db.prepare('SELECT * FROM course JOIN prereqs ON course.course_id = prereqs.course_id WHERE course.id=? ').get(id);

    return response;
}