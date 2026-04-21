/*
Run this test script with with 'node --env-file=.env .\testBackend.js' <token>
*/
import { API_BASE_URL, getBaseRequestHTTP } from './services/api.js';
// The following JSON variables are examples of CREATING the object in the backend
//NOTE: this JSON may not reflect the structure RETURNED from the backend (ie. might have more fields, different structure)
const testUser = {
    email: "yesyes@yes.com",
    password: "test123",
    first_name: "yes",
    last_name: "yes",
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

async function testCase(url, requestMessage){
    console.log("----------REQUEST----------")
    console.log(url);
    console.log(requestMessage);
    try{
        const response = await fetch(url, requestMessage);
        const data = await response.json();
        var passOrFail = "Pass";
        if(!data.success){
            passOrFail = "Fail";
        }
        console.log(`----------RESPONSE:${passOrFail}----------`);
        console.log(data);
        return data;
    }catch(err){
        console.log("----------RESPONSE:Fail----------")
        console.log(err);
        process.exit();
    }
}


async function testAPI(token){
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
    const degree_id = response.data.lastInsertRowid;
    console.log("Testing degree planner creation");
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
        course_id : "GEOG250"
    });
    response = await testCase(`${API_BASE_URL}/degree_plans/addCourse`, fetchReq);
}


const args = process.argv

if(args.length > 2){
    await testAPI(args[2]);
}else{
    console.log("Please specifiy a valid token in command line");
}