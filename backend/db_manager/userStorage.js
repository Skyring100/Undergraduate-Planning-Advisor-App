import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getUserByEmail(email) {

    const user = db.prepare('SELECT * FROM user WHERE user.email=?').get(email);
    const response = {
      student_id: user.id,
      emai: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    };
    return response;
}