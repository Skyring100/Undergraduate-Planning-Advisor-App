import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getCourseById(id) {
    const course = db.prepare('SELECT * FROM course WHERE course.course_id=? ').get(id);
    return course;
}

// added this to get all courses
export function getAllCourses()
{
    const courses = db.prepare('SELECT * FROM course').all();

    return courses;
}

export function getCoursesByDepartment(department){
    const courses = db.prepare('SELECT * FROM course WHERE course.department=?').get(department);
    return courses;
}

export function getDepartmentCodes(){
    const departments = db.prepare('SELECT department FROM course GROUP BY department').all();
    return departments;
}

export function getPrereqsOf(target) {
    const prereqs = db.prepare('SELECT * FROM prereq WHERE course_id=? ORDER BY ordering;').all(target).map(prereq => prereq.prereq_id);
    return prereqs;
}

export function makeNestedPrereqString(completed, target)
{
    /**
     * Creates a set of courses that you have and don't have for a given target.
     * @param completed The courses the student has already completed.
     * @param target The course ID the student wants to register for.
     */

    const prereqs = db.prepare('SELECT * FROM prereq WHERE course_id=? ORDER BY ordering;').all(target);
    const prereqList = prereqs.map(obj => {
        return obj.prereq_id + " minimum grade of " + obj.min_grade + "|" + obj.nesting
    }, prereqs).join("|").split("|");
    prereqList.pop(); // the last one will be zero, we dont want that
    // turn prereqList into an object
    // first, get highest precedence operator
    let highest = 0;
    for (let i=0; i<prereqList.length; i++) {
        if (/^[0-9]+$/.test(prereqList[i]) && parseInt(prereqList[i]) > highest)
            highest = parseInt(prereqList[i]);
    }

    //now pair on precedence
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

    return recursiveHaveNeed(completed, ret, true);
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
    // turn prereqList into an object
    // first, get highest precedence operator
    let highest = 0;
    for (let i=0; i<prereqList.length; i++) {
        if (/^[0-9]+$/.test(prereqList[i]) && parseInt(prereqList[i]) > highest)
            highest = parseInt(prereqList[i]);
    }

    //now pair on precedence
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
    if (root == undefined) return true;
    switch (root.relation) {
        case "single":
            return completed.includes(root.name);
        case "and":
            return root.on.every(obj => recursivePrereqCheck(completed, obj));
        case "or":
            return root.on.some(obj => recursivePrereqCheck(completed, obj));
    }
}

function recursiveHaveNeed(completed, root, first) {
    /** 
     * Makes an object containing which courses a student has completed
     * that satisfy the prerequisites for completing a given course.
     * @param completed The courses already completed by the student.
     * @param prereq The prerequisite dictionary of the course.
     */
    if (root == undefined) return [];
    switch (root.relation) {
        case "single":
            return [{
                state: completed.includes(root.name) ? "have" : "need",
                course: root.name,
            }];
        case "and":
            if (first) {
                return root.on.map(obj => recursiveHaveNeed(completed, obj, false)[0]);
            }
            else {
                let roe = root.on.every(obj => recursivePrereqCheck(completed, obj));
                let text = "(" + root.on.map(obj => {
                    let rhn = recursiveHaveNeed(completed, obj, false)[0];
                    return rhn.course;
                }).join(" and ") + ")"
                
                return [{
                    state: roe ? "have" : "need",
                    course: text,
                }];
            }
        case "or":
            let ros = root.on.every(obj => recursivePrereqCheck(completed, obj));

            let text = "(" + root.on.map(obj => {
                let rhn = recursiveHaveNeed(completed, obj, false)[0];
                return rhn.course;
            }).join(" or ") + ")"
            
            return [{
                state: ros ? "have" : "need",
                course: text,
            }];

    }
}
