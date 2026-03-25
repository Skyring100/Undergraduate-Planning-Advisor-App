import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getUserByEmail(email) {
  const q = `SELECT * FROM user
    LEFT JOIN user_taking_degree ON user.student_id = user_taking_degree.student_id
    LEFT JOIN user_completed_course ON user.student_id = user_completed_course.student_id
    WHERE user.email=?`
  const user = db.prepare(q).get(email);
  if (!user){
    return undefined;
  }
  return user;
}


export function saveUser(email, firstName, lastName, password) {
  console.log(`${email}, ${firstName}, ${lastName}, ${password}`);
  const userResult = db.prepare('INSERT INTO user(email, first_name, last_name, password_hash) VALUES (?, ?, ?, ?)').run(email, firstName, lastName, password);
  
  if (!userResult){
    return undefined;
  }

  return userResult;
}

export function addCompletedCourses(studentID, courses){
  //Ensure we are not readding courses the user already took
  const currentCoursesQuery = db.prepare('SELECT course_id FROM user_completed_course WHERE user_completed_course.student_id = ?').all(studentID);

  const currentCourses = []
  currentCoursesQuery.forEach((obj) => {
      currentCourses.push(obj.course_id.toString());
  });
  const newCourses = courses.filter((c) => !currentCourses.includes(c));
  console.log(courses);
  console.log(newCourses);
  const insert = db.prepare('INSERT INTO user_completed_course(student_id, course_id) VALUES (?, ?)');
  newCourses.forEach(course_id => {
    insert.run(studentID, course_id);
  });
  return {changes: newCourses.length};
}

export function addTakenDegree(student_id, degree_id){
  const result = db.prepare('INSERT INTO user_taking_degree(student_id, degree_id) VALUES (?, ?)').run(student_id, degree_id);
  return result;
}