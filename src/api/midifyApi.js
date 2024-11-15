// src/api/midifyApi.js (new file for API calls)
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const getApiOverview = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching API overview:", error);
    throw error;
  }
};

export const fetchUploads = () => axios.get(`${API_BASE_URL}/upload`);
export const fetchUploadHistory = () => axios.get(`${API_BASE_URL}/upload/history/`);
export const fetchProfile = (userId) => axios.get(`${API_BASE_URL}/profile/${userId}/`);
export const updateProfile = (userId, data) => axios.put(`${API_BASE_URL}/profile/${userId}/`, data);
