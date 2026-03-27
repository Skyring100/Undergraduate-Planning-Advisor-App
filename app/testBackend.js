/*
Run this test script with with ' node --env-file=.env .\testBackend.js'
*/


import { loginUser, registerUser } from "./services/authService.js";
import { createDegree } from "./services/degreeService.js";
import { addCompletedCourses } from "./services/userService.js";

// The following JSON variables are examples of CREATING the object in the backend
//NOTE: this JSON may not reflect the structure RETURNED from the backend (ie. might have more fields, different structure)
const testUser = {
    email: "test@test.com",
    password: "test123",
    first_name: "Test",
    last_name: "Tester",
    completed_courses: [
        "CPSC100",
        "CPSC101",
        "GEOG204",
        "CPSC141",
        "MATH100" 
    ],
    degrees: [
        "Computer Science"
    ]
}

const testDegree = {
    name: "Computer Science",
    is_minor: false,
    course_reqs: [
        {
            course_id: "CPSC100",
            min_grade: "C-"
        },
        {
            course_id: "CPSC101",
            min_grade: "C-"
        },
        {
            course_id: "CPSC141",
            min_grade: "C-"
        },
        {
            course_id: "CPSC242",
            min_grade: "C-"
        },
        {
            course_id: "MATH100",
            min_grade: "C-"
        }
    ],
    credit_reqs: [
        {
            description: "400 Level courses",
            num_credits: 12
        }
    ]
}

const testDegreePlan = {
    degree_ids: [1],
    years:[
        {
            "year_number": 1,
            "semesters": [
                {
                    "semester_number": 1,
                    "courses": [ "CPSC100", "CPSC101"]
                },
                {
                    "semester_number": 2,
                    "courses": [ "CPSC141", "CSPC242"]
                }
            ]
        },
        {
            "year_number": 2,
            "semesters": [
                {
                    "semester_number": 1,
                    "courses": [ "CPSC100", "CPSC101"]
                },
                {
                    "semester_number": 2,
                    "courses": []
                },
                {
                    "semester_number": 3,
                    "courses": [ "FUN101" ]
                }
            ]
        },
        {
            "year_number": 3,
            "semesters": [
                {
                    "semester_number": 1,
                    "courses": [ "GEOG204", "MATH100", "CPSC200"]
                }
            ]
        },
        {
            "year_number": 4,
            "semesters": [
                {
                    "semester_number": 2,
                    "courses": [ "CPSC444" ]
                }
            ]
        }
    ]
}

// USERS
async function newUserTestCase(){
    console.log("\nRegister User");
    await registerUser(testUser.email, testUser.password, testUser.first_name, testUser.last_name);
    console.log("Register User Complete\n")

    console.log("\nLog In User");
    const loggedInData = await loginUser(testUser.email, testUser.password);
    console.log("Log In User Complete\n");

    console.log("\nAdd completed courses to user");
    await addCompletedCourses(loggedInData.data.student_id, testUser.completed_courses)
    console.log("Add completed courses to user complete\n");


    //console.log("Add degree to user");
    
}

// COURSES


// DEGREES
async function newDegreeTestCase(){
    console.log("\nCreate degree");
    await createDegree(testDegree.name, testDegree.is_minor, testDegree.course_reqs, testDegree.credit_reqs);
    console.log("Create degree complete\n");
    //console.log("Get degree");

}

//DEGREE PLANS


// SECTIONS


await newUserTestCase();
await newDegreeTestCase();
