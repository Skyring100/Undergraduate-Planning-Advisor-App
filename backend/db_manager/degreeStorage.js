import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getDegreeByID(degreeID) {
    console.log(typeof(degreeID));
    const q = `SELECT * FROM degree 
        JOIN degree_course_requirement 
            ON degree.degree_id = degree_course_requirement.degree_id 
        JOIN degree_credit_requirement 
            ON degree.degree_id = degree_credit_requirement.degree_id 
        WHERE degree.degree_id = ?;`
    const degree = db.prepare(q).all(degreeID);
    return degree;
}

export function createDegree(name, is_minor, course_reqs, credit_reqs) {
    const degreeInfo = db.prepare("INSERT INTO degree(degree_name, is_minor) VALUES (?, ?)").run(name, ((is_minor)? 1 : 0));
    const courseReqs =  course_reqs;
    for (let i = 0; i < courseReqs.length; i++) {
        const course = courseReqs[i].course_id;
        const minGrade = courseReqs[i].min_grade;
        try{
            db.prepare("INSERT INTO degree_course_requirement(degree_id, course_id, min_grade) VALUES (?, ?, ?)").all(degreeInfo.lastInsertRowid, course, minGrade);   
        }catch(error){
            if(error.errcode == 787){
                console.log(`Course ${course} does not exist in database!`);
            }else{
                throw error;
            }
        }
    }
    const creditReqs = credit_reqs;
    for (let i = 0; i < creditReqs.length; i++) {
        const credReq = creditReqs[i];
        db.prepare("INSERT INTO degree_credit_requirement(degree_id, description, num_credits) VALUES (?, ?, ?)").all(degreeInfo.lastInsertRowid, credReq.description, credReq.num_credits);   
    }
    return true;
}
