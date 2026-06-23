/**
 * * [ ARCHITECTURAL CONCEPT ]:
 * A centralized Service Module handling user lifecycle operations, authentication, 
 * and profile management within the "Users" domain.

 * * [ FILE STRUCTURE ]:
 * - loginUser: Authenticates user and securely stores the returned JWT token.
 * - registerUser: Handles new user registration.
 * - getCurrentUser: Fetches authenticated user profile data.
 * - updateMyProfile: Updates existing profile information.
 * - deleteMyAccount: Handles account termination securely.
 */
import api from './axiosInstance';

// 1. Authenticate User & Store Session Token
export const loginUser = async (email, password) => {
  const res = await api.post('/users/login', {
    email,
    password
  });
  const token = res.data?.access_token;

  if (token) {
    localStorage.setItem('token', token);
  }

  return res.data; // { access_token, token_type }
};

// 2. Register New User Account
export const registerUser = async (payload) => {
  const res = await api.post('/users/register', payload);

  return res.data;
};

// 3. Fetch Current Authenticated User Profile
export const getCurrentUser = async () => {
  const res = await api.get('/users/me');
  return res.data;
};

// 4. Update Current User Profile Data
export const deleteMyAccount = async () => {
  const res = await api.delete('/users/me');
  return res.data;
};

// 5. Delete Current User Account
export const updateMyProfile = async (payload) => {
  const res = await api.put('/users/me', payload);
  return res.data;
};