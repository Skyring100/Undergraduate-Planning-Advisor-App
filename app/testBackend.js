/*
Run this test script with with 'node --env-file=.env .\testBackend.js'
*/
import { API_BASE_URL, getBaseRequestHTTP } from './services/api.js';
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
    name: "my plan",
    degree_id: 1,
    years:[
        {
            "year_number": 2020,
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
            "year_number": 2021,
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
            "year_number": 2022,
            "semesters": [
                {
                    "semester_number": 1,
                    "courses": [ "GEOG204", "MATH100", "CPSC200"]
                }
            ]
        },
        {
            "year_number": 2023,
            "semesters": [
                {
                    "semester_number": 2,
                    "courses": [ "CPSC444" ]
                }
            ]
        }
    ]
}

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNiMDk1NzQ3YmY4MzMxZWE0YWQ1M2YzNzBjNjMyNjAxNzliMGQyM2EiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdW5kZXJncmFkdWF0ZWRlZ3JlZXBsYW5uLWNkOGVhIiwiYXVkIjoidW5kZXJncmFkdWF0ZWRlZ3JlZXBsYW5uLWNkOGVhIiwiYXV0aF90aW1lIjoxNzc2NzUzMDg3LCJ1c2VyX2lkIjoidkcyT1F2cHBFNWZzMFNEUDlUSEdVRjAxYU9xMiIsInN1YiI6InZHMk9RdnBwRTVmczBTRFA5VEhHVUYwMWFPcTIiLCJpYXQiOjE3NzY3NTMwODcsImV4cCI6MTc3Njc1NjY4NywiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.OWhnfrb03XFw7mGp-nKvTF4EpwP42MPK-xnTa6WDVrHaqrf9cf_oSK4ApztU6J7ikXd2ltpFpZrZEEuoHqSI7SwuyCELkDtdq5lHhYtg9u9W-YeGXZg6D5aHQp3tZuGP5Qia3XR6Zapen4F9PQe8JHFHKMavCLPJB_n2BMiOTJMiB1TVjooxr5_ecDAU9Je-DPPQR-Dev3ohWGMrz1N8PMXFLDXPBw_WoX-7ZEwWQe2U_Y55LCVsoRzMSoN-Z8ZU9WAq8EzuHVUeYJTKFFU-k24GU-CixPCvPVY2O8nIq44x52et5BsIzEUiFh6M4lckNnf-Nzoi54Q_7H_qL2zulg'
async function testCase(url, requestMessage){
    console.log("----------REQUEST----------")
    console.log(url);
    console.log(requestMessage);
    const response = await fetch(url, requestMessage);
    try{
        const data = await response.json();
        console.log("----------RESPONSE----------");
        console.log(data);
        return data;
    }catch(err){
        console.log("Test failed, reason below")
        console.log(err);
        process.exit();
    }
}


async function userTestCase(){
    var fetchReq;
    var response;

    //Log in tests
    const courses = testUser.completed_courses;
    console.log("Testing Login");
    fetchReq = getBaseRequestHTTP('POST', token);
    fetchReq['body'] = JSON.stringify({
      'email' : testUser.email,
      'password' : testUser.password,
    });
    response = await testCase(`${API_BASE_URL}/auth/login`, fetchReq);
    
    //Adding completed courses
    const student_id = response.data.student_id;
    console.log("Testing adding courses");
    fetchReq = getBaseRequestHTTP('PUT', token);
    fetchReq['body'] = JSON.stringify({courses});
    response = await testCase(`${API_BASE_URL}/users/courses/${student_id}`, fetchReq);

    //Adding dummy degree
    console.log("Testing degree creation");
    fetchReq = getBaseRequestHTTP('POST', token);
    fetchReq['body'] = JSON.stringify({
        name: testDegree.name,
        is_minor: testDegree.isMinor,
        course_reqs: testDegree.course_reqs,
        credit_reqs: testDegree.credit_reqs
    });
    response = await testCase(`${API_BASE_URL}/degrees/create`, fetchReq);


    //Adding dummy degree planner
    const degree_id = response.data.lastInsertRowid
    console.log("Testing degree creation");
    fetchReq = getBaseRequestHTTP('POST', token);
    fetchReq['body'] = JSON.stringify({
            degree_plan_name : testDegreePlan.name,
            student_id : student_id,
            degree_id: degree_id
    });
    response = await testCase(`${API_BASE_URL}/degree_plans/create`, fetchReq);

    
    //Add course to degee plan
    console.log("Testing adding course to degree plan");
    fetchReq = getBaseRequestHTTP('POST', token);
    fetchReq['body'] = JSON.stringify({
        degree_plan_id : degree_id,
        year : 2020,
        semester_id : 1,
        course_id : "GEOG350"
    });
    response = await testCase(`${API_BASE_URL}/degree_plans/addCourse`, fetchReq);
}


await userTestCase();