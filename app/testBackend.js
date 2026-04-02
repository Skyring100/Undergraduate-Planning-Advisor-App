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

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM3MzAwNzY5YTA3ZTA1MTE2ZjdlNTEzOGZhOTA5MzY4NWVlYmMyNDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdW5kZXJncmFkdWF0ZWRlZ3JlZXBsYW5uLWNkOGVhIiwiYXVkIjoidW5kZXJncmFkdWF0ZWRlZ3JlZXBsYW5uLWNkOGVhIiwiYXV0aF90aW1lIjoxNzc1MTU2NDM3LCJ1c2VyX2lkIjoiSDhSU2Foc0Q5c1JLYXlmRFBHVjZwbkJ4VTZuMSIsInN1YiI6Ikg4UlNhaHNEOXNSS2F5ZkRQR1Y2cG5CeFU2bjEiLCJpYXQiOjE3NzUxNTY0MzcsImV4cCI6MTc3NTE2MDAzNywiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.UNBmLagevnorYpXZ4dqXqExmLsX_NqbUdH0RioQMhUAUZ3HpoYj3t5rjEwNnZXqVlLj7kDEtMNev2N0P4M5ay4nT6k2WMlP6JvTISsxdzd_mTCXspPHj0LQM7nyDQBR79twyUkr02_6CopjraZZWDnKXLyePuTyzYx90SGqoPmSf2F1jdDcyO3SyraIvtBXbWW7lbmMQKCscQBz_GbaEpk7B05S68PJ9S_okC-fJrMEqcy2C6HNxFeUVrPVjNtMjaDdB-bDHzuJ3cbYX0PmnvnqlyLMOKSeXRmbq8JmDHQSZEKNeRML07wCtwuaWMtIJGSCINRCET7MOnIs1UZxnEA'

async function testCase(url, requestMessage){
    console.log("----------REQUEST----------")
    console.log(url);
    console.log(requestMessage);
    const response = await fetch(url, requestMessage);
    console.log("----------RESPONSE----------")
    console.log(response);
}


async function userTestCase(){
    var fetchReq;

    console.log("Testing Login");
    fetchReq = getBaseRequestHTTP('POST', token);
    fetchReq['body'] = JSON.stringify({
      'email' : testUser.email,
      'password' : testUser.password,
    });
    await testCase(`${API_BASE_URL}/auth/login`, fetchReq);
    
    /*
    console.log("Testing adding courses");
    fetchReq = getBaseRequestHTTP('PUT', token);
    const courses = testUser.completed_courses;
    fetchReq['body'] = JSON.stringify({courses});
    await testCase(`${API_BASE_URL}/courses/${student_id}`, fetchReq);
    */
}


await userTestCase();