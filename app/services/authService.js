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

/**
 * Register a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User full name
 * @param {string} phone - User phone number
 * @returns {Promise<{success: boolean, data?: object, message?: string}>}
 */
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

  if (response.ok && data.success) {
    return {
      success: true,
      data: data.data,
      message: data.message,
    };
  } else {
    return {
      success: false,
      message: data.message || 'Registration failed. Please try again.',
    };
  }
};

