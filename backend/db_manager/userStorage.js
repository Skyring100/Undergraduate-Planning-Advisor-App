import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getUserByEmail(email) {
  const q = `SELECT * FROM user
    JOIN user_taking_degree ON user.student_id = user_taking_degree.student_id
    JOIN user_completed_courses ON user.student_id = user_completed_courses.student_id
    WHERE user.email=?`
  const user = db.prepare(q).get(email);
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

    return result;
}