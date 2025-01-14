import apiClient from './midifyApi';
import axios from 'axios';

const getCsrfToken = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/csrf-token/');
    return response.data.csrfToken;
  };
  
  
// Login Function
export const loginUser = async (username, password) => {
  try {
    console.log('Sending login request:', { password, username });
    const csrfToken = await getCsrfToken(); // Fetch CSRF token
    const response = await apiClient.post('/auth/login/', {username,password},{ headers: { 'X-CSRFToken': csrfToken }} );
    console.log("response here", response);
    localStorage.setItem('authToken', response.data.token); // Save token
    console.log("Here is the token", response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const testApi = async () => {
    try {
      const response = await apiClient.get('/test/'); // Assuming your API base URL is configured
      console.log('Test API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error calling Test API:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  };
  

// // Logout Function
// export const logoutUser = () => {
//     localStorage.removeItem('authToken'); // Clear the token from localStorage
//   };
  
