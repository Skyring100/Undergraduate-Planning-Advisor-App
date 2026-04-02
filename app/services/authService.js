import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, getBaseRequestHTTP } from './api.js';
import { initializeAuth, getAuth, getReactNativePersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import { initializeApp, getApps  } from 'firebase/app';

const firebaseConfig = require('../firebase_config.json');

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];


const auth = initAuth()

function initAuth(){
  try{
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }catch{
    return getAuth(app);
  }
}

if(app == undefined){
  console.log("'app' is undefined for authentication!");
}
if(auth == undefined){
  console.log("'auth' is undefined for authentication!");
}

export const loginUser = async (email, password) => {
  console.log("Signing in with Firebase auth...");
  var userCredential;
  try{
    userCredential = await signInWithEmailAndPassword(auth, email, password);
  }catch(err){
    if(err.code == 'auth/invalid-email' || err.code == 'auth/invalid-credential'){
      const errMsg = "Invalid username or password";
      console.log(errMsg);
      return {success: false, message: errMsg};
    }else{
      console.log("Error with authentication: ", err);
      return {success : false, message: err.message};
    }
  }
  const token = await userCredential.user.getIdToken();
  console.log(`Got token from Firebase: ${token}`);
  
  const url = `${API_BASE_URL}/auth/login`;
  console.log('Login API URL:', url);

  const fetchReq = getBaseRequestHTTP('POST', token);
  fetchReq['body'] = JSON.stringify({
      email,
      password,
    });

  const response = await fetch(url, fetchReq);
  const data = await response.json();
  return addTokenData(data, token);
};

export const registerUser = async (email, password, first_name, last_name) => {
  const url = `${API_BASE_URL}/auth/register`;
  console.log(url)
  console.log("Creating Firebase user...");
  var userCredential;
  try{
    userCredential = await createUserWithEmailAndPassword(auth, email, password);
  }catch(err){
    return {success: false, message: err.message};
  }
  const token = await userCredential.user.getIdToken();
  console.log(`Got token from Firebase: ${token}`);

  const fetchReq = getBaseRequestHTTP('POST', token);
  fetchReq['body'] = JSON.stringify({
      email,
      first_name,
      last_name,
    });

  const response = await fetch(url, fetchReq);
  const data = await response.json();
  return addTokenData(data, token);
};

async function addTokenData(data, token){

  console.log('Login response data:', data);
  try{
    await AsyncStorage.setItem('authToken', token);
  }catch(err){
    console.log(err);
  }
  data['token'] = token;
  return data; 
}