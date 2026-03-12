import { API_BASE_URL } from './api';

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

