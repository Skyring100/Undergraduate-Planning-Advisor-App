import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api.js';
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

  // Add timeout to prevent infinite hanging
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      email,
      password,
    }),
    signal: controller.signal
  });
  

  return addTokenData(response, token);
};

export const registerUser = async (email, password, first_name, last_name) => {
  const url = `${API_BASE_URL}/auth/register`;
  console.log(url)
  console.log("Creating Firebase user...");
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  console.log(`Got token from Firebase: ${token}`);

  // Add timeout to prevent infinite hanging
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      email,
      first_name,
      last_name,
    }),
    signal: controller.signal
  });
  clearTimeout(timeoutId);

  return addTokenData(response, token);
};

async function addTokenData(response, token){
  const data = await response.json();
  console.log('Login response data:', data);
  try{
    await AsyncStorage.setItem('authToken', token);
  }catch(err){
    console.log(err);
  }
  data['token'] = token;
  return data; 
}