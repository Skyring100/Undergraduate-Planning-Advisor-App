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

export function setSection( c_id, dow, start_time, end_time, start_date, end_date, building, room_n, instructor) {
    console.log("Storage ", c_id, " ", dow, " ", start_time, " ", end_time, " ", start_date, " ", end_date, " ", building, " ", room_n, " ", instructor)
    try{
        const q = `INSERT INTO section ( course_id, days_of_week, start_time, end_time, start_date, end_date, building, room_number, instructor_name) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.prepare(q).run(c_id, dow, start_time, end_time, start_date, end_date, building, room_n, instructor);
        return q;
    } catch(error){
        if(error.errcode == 787){
            console.log("Invalid course id!");
            return undefined;
        }else{
            throw error;
        }
    }

}