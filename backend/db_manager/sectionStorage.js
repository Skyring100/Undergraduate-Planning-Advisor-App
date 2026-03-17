import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getSectionsForCourse(courseID) {

    const sections = db.prepare('SELECT * FROM section WHERE section.course_id=?').all(courseID);
    return sections;
}


export function getSectionByCRN(crn) {

    const section = db.prepare('SELECT * FROM section WHERE section.crn=?').get(crn);
    if (!section){
        return undefined;
    }
    return section;
}


export function getSectionsOnDayOfWeek(dow) {
    const q = `SELECT * FROM section WHERE section.days_of_week LIKE '%${dow}%'`;
    const section = db.prepare(q).all();
    if (!section){
        return undefined;
    }
    return section;
}