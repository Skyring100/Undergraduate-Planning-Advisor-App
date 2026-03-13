import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getUserByEmail(email) {

    const user = db.prepare('SELECT * FROM user WHERE user.email=?').get(email);
    if (!user){
      return undefined;
    }
    const response = {
      student_id: user.student_id,
      emai: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password_hash: user.password_hash
    };
    return response;
}


export function saveUser(user) {

    const result = db.prepare('INSERT INTO user(email, first_name, last_name, password_hash) VALUES (?, ?, ?, ?)').get(user.email, user.firstName, user.lastName, user.password);
    if (!result){
      return undefined;
    }
    const response = {
      student_id: result.student_id,
      email: result.email,
      first_name: result.first_name,
      last_name: result.last_name,
      password_hash: result.password_hash
    };
    return response;
}