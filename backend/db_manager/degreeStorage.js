import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getDegreeByID(degreeID) {

    const degree = db.prepare(`SELECT * FROM degree 
        JOIN degree_course_requirement ON degree.degree_id = degree_course_requirement.degree_id
        JOIN degree_credit_requirement ON degree.degree_id = degree_credit_requirement.degree_id
        WHERE degree.degree_id=?`).all(degreeID);
    return degree;
}

export function createDegree(degree) {

    db.prepare("INSERT INTO degree(name) VALUES (?)").all(degree.name);
    const courseReqs =  degree.course_reqs;
    for (let i = 0; i < courseReqs.length; i++) {
        const course = courseReqs[i];
        db.prepare("INSERT INTO degree_course_requirement(degree_id, course_id, level) VALUES (?, ?, ?)").all(degree.degree_id, course.course_id, course.course_id.slice(-3));   
    }
    const creditReqs = degree.credit_reqs
    for (let i = 0; i < creditReqs.length; i++) {
        const credReq = creditReqs[i];
        db.prepare("INSERT INTO degree_credit_requirement(degree_id, description, num_credits) VALUES (?, ?, ?)").all(degree.degree_id, credReq.description, credReq.num_credits);   
    }
    return true;
}