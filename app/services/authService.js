import { API_BASE_URL } from './api';

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
export const registerUser = async (email, password, firstName, lastName) => {
  const url = `${API_BASE_URL}/auth/register`;
  console.log('Register API URL:', url);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
    }),
  });

  const data = await response.json();

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

