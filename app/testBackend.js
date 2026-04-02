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

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM3MzAwNzY5YTA3ZTA1MTE2ZjdlNTEzOGZhOTA5MzY4NWVlYmMyNDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdW5kZXJncmFkdWF0ZWRlZ3JlZXBsYW5uLWNkOGVhIiwiYXVkIjoidW5kZXJncmFkdWF0ZWRlZ3JlZXBsYW5uLWNkOGVhIiwiYXV0aF90aW1lIjoxNzc1MTYxOTA5LCJ1c2VyX2lkIjoiS2tXMjMweE5wUFJYM0ZtZ3lLRllNUjZzbzlqMiIsInN1YiI6IktrVzIzMHhOcFBSWDNGbWd5S0ZZTVI2c285ajIiLCJpYXQiOjE3NzUxNjE5MDksImV4cCI6MTc3NTE2NTUwOSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Y0Jv0rNy8K75Xz6YeSq72w4ZycEgMjM31BrRUxdEPIMgvCClg8o4pRaYn7SAHG5E9m-Ghta22dbe7axiVoqNiN1EqE12v6VTZz7jf38vrrd251Wyf0uUUExKYyd4IZ6vuSIPQfl8sVrgwscncm11TOs_uswB51_n57UXocCRP0hPA8aV4O-jKV6BPQ1QGm8-FMDup_sJT6DiIQCaO-_lRvcRHo3ycEoJOvVs8tuKPbVSjBINfw8dQzjPbT2Um5JCyp3FzBZvsR30fnElACxDxiKk8u8BP3Pr6RD-Nx9bzHh-qcsluMSPVgFB6duH2BSWOPpWjPYkW6LLV4MNbQ9MmA'

async function testCase(url, requestMessage){
    console.log("----------REQUEST----------")
    console.log(url);
    console.log(requestMessage);
    const response = await fetch(url, requestMessage);
    const data = await response.json();
    console.log("----------RESPONSE----------");
    console.log(data);
    return data;
}


async function userTestCase(){
    var fetchReq;
    var response;

    const courses = testUser.completed_courses;

    console.log("Testing Login");
    fetchReq = getBaseRequestHTTP('POST', token);
    fetchReq['body'] = JSON.stringify({
      'email' : testUser.email,
      'password' : testUser.password,
    });
    response = await testCase(`${API_BASE_URL}/auth/login`, fetchReq);
    
    const student_id = response.data.student_id;

    console.log("Testing adding courses");
    fetchReq = getBaseRequestHTTP('PUT', token);
    fetchReq['body'] = JSON.stringify({courses});
    await testCase(`${API_BASE_URL}/users/courses/${student_id}`, fetchReq);

    
}


await userTestCase();