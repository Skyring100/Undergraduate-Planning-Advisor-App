import { getDatabaseConnection } from "./databaseActions.js";
const db = getDatabaseConnection();


export function getUserByEmail(email) {
  const user = db.prepare('SELECT * FROM user WHERE user.email=?').get(email);
  if (!user){
    return undefined;
  }
  const completed_courses = db.prepare('SELECT course_id, in_progress, grade FROM user_completed_course WHERE user_completed_course.student_id=?').get(user.student_id);
  const degrees = db.prepare(`SELECT degree.degree_name, degree.degree_id FROM user_taking_degree 
    LEFT JOIN degree ON user_taking_degree.degree_id = degree.degree_id
    WHERE user_taking_degree.student_id=?`).get(user.student_id);
  user.completed_courses = completed_courses;
  console.log(JSON.stringify(user.completed_courses));
  user.degrees = degrees;
  return user;
}

export function getUserByStudentID(id){
  const user = db.prepare('SELECT * FROM user WHERE user.student_id=?').get(id);
  if (!user){
    return undefined;
  }
  const completed_courses = db.prepare('SELECT course_id, in_progress, grade FROM user_completed_course WHERE user_completed_course.student_id=?').all(user.student_id);
  const degrees = db.prepare(`SELECT degree.degree_name, degree.degree_id FROM user_taking_degree 
    LEFT JOIN degree ON user_taking_degree.degree_id = degree.degree_id
    WHERE user_taking_degree.student_id=?`).all(user.student_id);
  user.completed_courses = completed_courses;
  user.degrees = degrees;
  console.log("will be returning:");
  console.log(user);
  return user;
}


export function saveUser(studentID, email, firstName, lastName) {
  console.log(`${studentID}, ${email}, ${firstName}, ${lastName}`);
  const userResult = db.prepare('INSERT INTO user(student_id, email, first_name, last_name, created_at) VALUES (?, ?, ?, ?, datetime(?))').run(studentID, email, firstName, lastName, 'now');
  
  if (!userResult){
    return undefined;
  }

  return userResult;
}

export function updateFirstName(studentID, firstName)
{
  console.log(`${studentID}, ${firstName}`);
  const userResult = db.prepare('UPDATE user SET first_name= ? WHERE student_id = ?').run(firstName, studentID);

  if (!userResult)
  {
    return undefined;
  }

  return userResult;
}

export function updateLastName(studentID, lastName)
{
  console.log(`${studentID}, ${lastName}`);
  const userResult = db.prepare('UPDATE user SET last_name = ? WHERE student_id = ?').run(lastName, studentID);

  if (!userResult)
  {
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

export function setCurrentUserDegree(studentID, degreeID){
  const result = db.prepare('UPDATE user SET current_degree_id = ? WHERE user.student_id=?').run(degreeID, studentID);
  return result;
}

export function setCurrentuserDegreePlan(student_id, degree_plan_id){
  const result = db.prepare('UPDATE user SET current_degree_plan = ? WHERE user.student_id=?').run(degree_plan_id, student_id);
  return result;
}
