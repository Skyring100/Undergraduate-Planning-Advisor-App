import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getSectionsForCourse(courseID) {

    const sections = db.prepare('SELECT * FROM section WHERE section.course_id=?').all(courseID);
    if (sections.length == 0){
        return undefined;
    }
    return sections;
}


export function getSectionByCRN(crn) {

    const section = db.prepare('SELECT * FROM section WHERE section.crn=?').get(crn)
    if (!section){
        return undefined;
    }
    return section;
}