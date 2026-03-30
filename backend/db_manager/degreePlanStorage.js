import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getDegreePlanByID(studentID) {
    const q = "SELECT * FROM degree_plan JOIN degree_plan_course ON degree_plan.degree_plan_id = degree_plan_course.degree_plan_id JOIN user_degree ON degree_plan.student_id = user_degree.student_id WHERE degree_plan.degree_plan_id=?"
    const degreePlan = db.prepare(q).all(studentID);
    return degreePlan;
}

export function createDegreePlan(degreePlanName, studentID) {

    const degreePlan = db.prepare("INSERT INTO degree_plan(student_id, degree_plan_name) VALUES (?, ?)").run(studentID, degreePlanName );
    
    return true;
}