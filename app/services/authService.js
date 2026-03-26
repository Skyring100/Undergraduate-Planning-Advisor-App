import { API_BASE_URL } from './api.js';

export const loginUser = async (email, password) => {
  const url = `${API_BASE_URL}/auth/login`;
  console.log('Login API URL:', url);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    })
  });
  
  const data = await response.json();
  console.log('Login response data:', data);

  return data;
};

export const registerUser = async (email, password, first_name, last_name) => {
  const url = `${API_BASE_URL}/auth/register`;
  console.log(url)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      first_name,
      last_name,
    }),
  });

  const data = await response.json();
  console.log(data);

  return data;
};

