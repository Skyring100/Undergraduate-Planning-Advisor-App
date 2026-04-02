import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getDegreePlanById(id) {

    const degree_plan = db.prepare('SELECT * FROM degree_plan ON course.course_id = prereqs.course_id WHERE course.id=? ').get(id);

    return course;
}

export function getDegreePlanByID(studentID) {
    console.log(studentID);
    const q = "SELECT * FROM degree_plan JOIN degree_plan_course ON degree_plan.degree_plan_id = degree_plan_course.degree_plan_id JOIN user_taking_degree ON degree_plan.student_id = user_taking_degree.student_id WHERE degree_plan.student_id=?"
    const degreePlan = db.prepare(q).all(studentID);
    return degreePlan;
}

export function createDegreePlan(degreePlanName, studentID) {

    const degreePlan = db.prepare("INSERT INTO degree_plan(student_id, degree_plan_name, created_at) VALUES (?, ?, datetime(?))").run(studentID, degreePlanName, 'now');
    
    return true;
}

export function addCourseToDegreePlan(degreePlanID, year, semesterID, courseID) {

    const degreePlan = db.prepare("INSERT INTO degree_plan_course(degreePlanID, year, semesterID, courseID) VALUES (?, ?, ?, ?)").run(degreePlanID, year, semesterID, courseID);
    
    return true;
}
