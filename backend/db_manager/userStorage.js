import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getUserByEmail(email) {
  const user = db.prepare('SELECT * FROM user WHERE user.email=?').get(email);
  if (!user){
    return undefined;
  }
  const completed_courses = db.prepare('SELECT course_id, in_progress FROM user_completed_course WHERE user_completed_course.student_id=?').get(user.student_id);
  const degrees = db.prepare(`SELECT degree.name FROM user_taking_degree 
    LEFT JOIN degree ON user_taking_degree.degree_id = degree.degree_id
    WHERE user_taking_degree.student_id=?`).get(user.student_id);
  user.completed_courses = completed_courses;
  user.degrees = degrees;
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