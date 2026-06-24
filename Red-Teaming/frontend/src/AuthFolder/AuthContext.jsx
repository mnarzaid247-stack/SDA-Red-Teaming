/**
 * [ ARCHITECTURAL CONCEPT ]:
 * A centralized Authentication and Authorization Context Provider managing global user session state.
 * 
 * * [ FILE STRUCTURE ]:
 * - AuthProvider: Context wrapper that persists user session and validates identity on initialization.
 * - login: Persists the access token and updates the global user data context.
 * - logout: Clears active session tokens and resets the global state.
 * - useAuth: Custom hook providing unified access to authorization state and session actions.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

import api from '../API/axiosInstance'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. SESSION INITIALIZATION: Lifecycle effect to validate existing client tokens against the active directory
  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await api.get('/users/me');
          setUser(response.data); 
        } catch (error) {
          console.error("Session expired or invalid token:", error);
          localStorage.removeItem('access_token');
        }
      }
      setLoading(false);
    };

    checkLoggedInUser();
  }, []);

  // 2. SESSION MUTATION: Establishes a new authenticated session context
  const login = (userData, token) => {
    localStorage.setItem('access_token', token);
    setUser(userData);
  };

  // 3. SESSION TERMINATION: Tears down the authenticated context and flushes local storage cache
  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 4. CONSUMER EXPOSURE HOOK: Global interface for state extraction and session orchestration
export const useAuth = () => useContext(AuthContext);