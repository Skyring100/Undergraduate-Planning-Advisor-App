import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getDegreePlanByID(degreePlanID) {

    const q = "SELECT year, semester_id, course_id  FROM degree_plan JOIN degree_plan_course ON degree_plan.degree_plan_id = degree_plan_course.degree_plan_id JOIN user_taking_degree ON degree_plan.student_id = user_taking_degree.student_id WHERE degree_plan.degree_plan_id=?"
    const degreePlanCourses = db.prepare(q).all(degreePlanID);

    const mainQ = db.prepare('SELECT * FROM degree_plan WHERE degree_plan.degree_plan_id=?').all(degreePlanID);
    mainQ['courses'] = degreePlanCourses;
    return mainQ;
}

export function getUserDegreePlans(){
    const q = "SELECT year, semester_id, course_id  FROM degree_plan JOIN degree_plan_course ON degree_plan.degree_plan_id = degree_plan_course.degree_plan_id JOIN user_taking_degree ON degree_plan.student_id = user_taking_degree.student_id WHERE degree_plan.student_id=?"
    const degreePlanCourses = db.prepare(q).all(degreePlanID);

    const mainQ = db.prepare('SELECT * FROM degree_plan WHERE degree_plan.student_id=?').all(degreePlanID);
    mainQ['courses'] = degreePlanCourses;
    return mainQ;
}


export function createDegreePlan(degreePlanName, studentID, degreeID) {

    const degreePlan = db.prepare("INSERT INTO degree_plan(student_id, degree_plan_name, degree_id, created_at) VALUES (?, ?, ?, datetime(?))").run(studentID, degreePlanName, degreeID, 'now');
    
    return degreePlan;
}

export function addCourseToDegreePlan(degreePlanID, year, semesterID, courseID) {

    const degreePlan = db.prepare("INSERT INTO degree_plan_course(degree_plan_id, year, semester_id, course_id) VALUES (?, ?, ?, ?)").run(degreePlanID, year, semesterID, courseID);
    
    return degreePlan;
}

export function getAllDegreePlans(){
    const q = "SELECT year, semester_id, course_id  FROM degree_plan JOIN degree_plan_course ON degree_plan.degree_plan_id = degree_plan_course.degree_plan_id JOIN user_taking_degree ON degree_plan.student_id = user_taking_degree.student_id"
    const degreePlanCourses = db.prepare(q).all();

    const mainQ = db.prepare('SELECT * FROM degree_plan').all();
    mainQ['courses'] = degreePlanCourses;
    return mainQ;
}
