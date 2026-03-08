import { API_BASE_URL } from './api';

/**
 * Get user profile using JWT token
 * @param {string} token - JWT authentication token
 * @returns {Promise<{success: boolean, data?: object, message?: string}>}
 */
export const getUserProfile = async (token) => {
  try {
    const url = `${API_BASE_URL}/users/profile`;
    console.log('Get profile API URL:', url);
    console.log('Starting profile request...');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Profile response status:', response.status);
    const data = await response.json();
    console.log('Profile response data:', data);

    if (response.ok && data.success) {
      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to fetch profile. Please try again.',
      };
    }
  } catch (error) {
    console.error('Get profile API error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
    });
    
    let errorMessage = 'Network error. Please check your connection and try again.';
    
    if (error.message === 'Network request failed') {
      errorMessage = 'Cannot connect to server. Please verify the server is running and accessible.';
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * Change user password
 * @param {string} token - JWT authentication token
 * @param {string} oldPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export const changePassword = async (token, oldPassword, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to change password. Please try again.',
      };
    }
  } catch (error) {
    console.error('Change password API error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
};
