import axios from 'axios';
import { useContext } from 'react';
import AuthContext from './authContext';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// const token = '07d6787ec303767bdb118a0b6a0ac5802ee75537';

// Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to requests automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); 
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const useApiClient = () => {
    const { authToken } = useContext(AuthContext);
  
    const client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    client.interceptors.request.use((config) => {
      if (authToken) {
        config.headers.Authorization = `Token ${authToken}`;
      }
      return config;
    });
  
    return client;
  };

// Centralized error handling
const handleApiError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error.response?.data || error.message;
};

// API functions
export const getApiOverview = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};


export const deleteUpload = async (id) => {
  try {
    await apiClient.delete(`/upload/${id}/`);
    console.log('File deleted successfully.');
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};


export const fetchUploadHistory = async () => {
    try {
      const response = await apiClient.get('/history/');
      console.log('Upload History Response:', response.data); // Debug API response

      return response.data; // Return the data to be used in the component
    } catch (error) {
      console.error('Error fetching history:', error.response?.data || error.message);
      throw error.response?.data || error.message; // Re-throw error for the caller to handle
    }
  };

export const fetchImage = async (uploadId) => {
    try {
      const response = await apiClient.get(`/history/${uploadId}/`, {
        responseType: 'blob', // Fetch the response as binary data
      });
      console.log('Upload History Response:', response.data); // Debug API response

      return response.data; // Return the data to be used in the component
    } catch (error) {
      console.error('Error fetching image from history:', error.response?.data || error.message);
      throw error.response?.data || error.message; // Re-throw error for the caller to handle
    }
  };
  
  
export const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/profile/');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error.response?.data || error.message);
      throw error.response?.data || error.message; // Re-throw error for the caller
    }
  };
  

export const updateProfile = async (data) => {
  try {
    const response = await apiClient.put('/profile/', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export default apiClient; 