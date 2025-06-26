import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual backend API URL
});

// Request interceptor to add JWT token to headers
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from local storage (or any other storage mechanism)
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      // You might need to adjust the path to your login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
