import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


<<<<<<< HEAD
export function getDegreePlanById(id) {

    const degree_plan = db.prepare('SELECT * FROM degree_plan ON course.course_id = prereqs.course_id WHERE course.id=? ').get(id);

    return course;
}

// added this to get all courses
export function getAllCourses()
{
    const courses = db.prepare('SELECT * FROM course').all();

    return courses;
}

export function checkIfPrereqsMatchCourse(completed, target)
{
    /**
     * Checks if a course can be registered for with the courses in prereqs.
     * @param completed The courses the student has already completed.
     * @param target The course ID the student wants to register for.
     */

    const prereqs = db.prepare('SELECT * FROM prereq WHERE course_id=? ORDER BY ordering;').all(target);
    const prereqList = prereqs.map(obj => {
        return obj.prereq_id + " minimum grade of " + obj.min_grade + "|" + obj.nesting
    }, prereqs).join("|").split("|");
    prereqList.pop(); // the last one will be zero, we dont want that
    console.log("here's the list:")
    console.log(JSON.stringify(prereqList))
    // turn prereqList into an object
    // first, get highest precedence operator
    let highest = 0;
    for (let i=0; i<prereqList.length; i++) {
        if (/^[0-9]+$/.test(prereqList[i]) && parseInt(prereqList[i]) > highest)
            highest = parseInt(prereqList[i]);
    }

    //now pair on precedence
    console.log("pairing on precedence");
    while (prereqList.length > 1) {
        for (let p=highest; p>0; p--) {
            for (let i=0; i<prereqList.length; i++) {
                if (+prereqList[i] == p) {
                    let reln = p % 2 == 0 ? "or" : "and"; // only even if it's OR
                    prereqList.splice(i-1, 3, {relation: reln, on: [prereqList[i-1], prereqList[i + 1]]});
                    i = -1 // start from the beginning
                }
            }
        }
    }
    console.log("flattening spikes");
    // flatten associativity spikes
    let ret = prereqList[0];
    let modMade = true;
    while (modMade) {
        modMade = false;
        if (typeof(ret) == "object") {
            for (let k=0; k<ret.on; k++) {
                let j = ret.on[k];
                if (typeof(j) == "object" && j.relation == ret.relation) {
                    ret.on.splice(k, 1, j.on);
                    modMade = true;
                    break;
                }
            }
        }
    }
    console.log("wrapping courses");

    // wrap singles recursively
    function wrapCourses(current) {
        if (typeof(current) == "object") {
            if (current.relation == "single") return current;
            return {
                relation: current.relation,
                on: current.on.map(obj => wrapCourses(obj)),
            };
        } else if (typeof(current) == "string") {
            let coursePartition = current.split(" minimum grade of ");
            return {
                relation: "single",
                name: coursePartition[0],
                min_grade: coursePartition[1],
            }
        }
    }
    ret = wrapCourses(ret);

    return recursivePrereqCheck(completed, ret);
}

function recursivePrereqCheck(completed, root) {
    /** 
     * Checks if completed courses satisfy the prerequisites for completing a given course.
     * @param completed The courses already completed by the student.
     * @param prereq The prerequisite dictionary of the course.
     */
    switch (root.relation) {
        case "single":
            console.log("found a single course: " + root.name)
            return completed.includes(root.name);
        case "and":
            console.log("found an AND")
            return root.on.every(obj => recursivePrereqCheck(completed, obj));
        case "or":
            console.log("found an OR")
            return root.on.some(obj => recursivePrereqCheck(completed, obj));
    }
}
=======
export function getDegreePlanByID(studentID) {
    const q = "SELECT * FROM degree_plan JOIN degree_plan_course ON degree_plan.degree_plan_id = degree_plan_course.degree_plan_id JOIN user_degree ON degree_plan.student_id = user_degree.student_id WHERE degree_plan.degree_plan_id=?"
    const degreePlan = db.prepare(q).all(studentID);
    return degreePlan;
}

export function createDegreePlan(degreePlanName, studentID) {

    const degreeInfo = db.prepare("INSERT INTO degree_plan(,student_id, degree_plan_name) VALUES (?, ?)").run(studentID, degreePlanName );
    for (let i = 0; i < creditReqs.length; i++) {
        const credReq = creditReqs[i];
        db.prepare("INSERT INTO degree_credit_requirement(degree_id, description, num_credits) VALUES (?, ?, ?)").all(degreeInfo.lastInsertRowid, credReq.description, credReq.num_credits);   
    }
    return true;
}
>>>>>>> 789787a83c3f9a058436c419a3910b09ed5b562f
