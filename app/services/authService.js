import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api.js';
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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
    console.log("Auth object is trying to be reinitalized, ignoring reinitalization");
  }
}

export const loginUser = async (email, password) => {
  const url = `${API_BASE_URL}/auth/login`;
  console.log('Login API URL:', url);
  console.log("Signing in with Firebase auth...");
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  console.log(`Got token from Firebase: ${token}`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify({
      email,
      password,
    })
  });
  
  const data = await response.json();
  console.log('Login response data:', data);
  await AsyncStorage.setItem('authToken', data.token);

  return data;
};

export const registerUser = async (email, password, first_name, last_name) => {
  const url = `${API_BASE_URL}/auth/register`;
  console.log(url)
  console.log("Creating Firebase user...");
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  console.log(`Got token from Firebase: ${token}`);

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
  });

  const data = await response.json();
  console.log(data);
  await AsyncStorage.setItem('authToken', data.token);

  return data;
};

