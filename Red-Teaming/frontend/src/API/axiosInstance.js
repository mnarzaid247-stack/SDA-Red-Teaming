/**
 * [ ARCHITECTURAL CONCEPT & PURPOSE ]:
 * This file acts as the central Network Layer for the application. It creates and 
 * configures a global Axios instance to standardize all outgoing HTTP requests.
 * 
 * [ INTERCEPTORS LOGIC & BENEFITS ]:
 * 1. Request Interceptor: Automatically injects the JWT Bearer Token from localStorage 
 *    into the Authorization header of every request, handling global authentication seamlessly.
 * 2. Response Interceptor: Centrally handles HTTP errors. If a 401 (Unauthorized) status 
 *    is detected, it securely clears the expired token to maintain application security.
 * 3. Consistency: Enforces unified headers (Content-Type) and CORS credential handling.
 * 
 *  
 * */
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sda-red-teaming.onrender.com/',
  withCredentials: true, // مهم لو الباك يستخدم cookies أو جلسات
});

// REQUEST INTERCEPTOR: Global Auth Injection
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR: Global Error & Auth Handlers
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized - clearing token');
      localStorage.removeItem('access_token');
      // 🔥 optional (لو عندك router)
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;