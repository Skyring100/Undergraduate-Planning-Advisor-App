import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getDegreeByID(degreeID) {

    const degree = db.prepare(`SELECT * FROM degree 
        JOIN degree_course_requirement ON degree.degree_id = degree_course_requirement.degree_id
        JOIN degree_credit_requirement ON degree.degree_id = degree_credit_requirement.degree_id
        WHERE degree.degree_id=? ORDER BY degree_course_requirement.level`).all(degreeID);
    return degree;
}

export function createDegree(name, is_minor, course_reqs, credit_reqs) {

    const degreeInfo = db.prepare("INSERT INTO degree(name, is_minor) VALUES (?, ?)").run(name, ((is_minor) ? 1 : 0) );
    console.log(degreeInfo);
    const courseReqs =  course_reqs;
    for (let i = 0; i < courseReqs.length; i++) {
        const course = courseReqs[i];
        db.prepare("INSERT INTO degree_course_requirement(degree_id, course_id, level) VALUES (?, ?, ?)").all(degreeInfo.lastInsertRowid, course, Number(course.slice(-3)));   
    }
    const creditReqs = credit_reqs
    for (let i = 0; i < creditReqs.length; i++) {
        const credReq = creditReqs[i];
        db.prepare("INSERT INTO degree_credit_requirement(degree_id, description, num_credits) VALUES (?, ?, ?)").all(degreeInfo.lastInsertRowid, credReq.description, credReq.num_credits);   
    }
    return true;
}