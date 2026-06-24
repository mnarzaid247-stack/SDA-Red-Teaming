/**
 * [ architectural concept ]: 
 * A centralized Service Module handling user lifecycle operations, authentication, 
 * and administrative user management within the "Users" domain.
 * 
 * [ File Stucture ]:
 *   - loginUser: Authenticates user and securely stores the returned JWT token.
 *   - registerUser: Handles new user registration.
 *   - getCurrentUser: Fetches authenticated user profile data.
 *   - updateMyProfile: Updates current user profile information.
 *   - deleteMyAccount: Handles current account termination securely.
 *   - getAllUsers: [ADMIN ONLY] Fetches a list of all registered system users.
 *   - getUserById: [ADMIN ONLY] Fetches comprehensive profile metrics for a specific user.
 *   - updateAnyUser: [ADMIN ONLY] Overwrites specific user metadata and role configurations.
 *   - deleteUser: [ADMIN ONLY] Permanently expels a user instance from the database.
 */
import api from './axiosInstance';

// 1. STANDARD USER LIFECYCLE & AUTHENTICATION


// 1. Authenticate User & Store Session Token
export const loginUser = async (email, password) => {
  const res = await api.post('/users/login', { email, password });
  const token = res.data?.access_token;

  if (token) {
    // تم توحيد الاسم إلى access_token ليتطابق مع الـ AuthContext
    localStorage.setItem('access_token', token); 
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
export const updateMyProfile = async (payload) => {
  const res = await api.put('/users/me', payload);
  return res.data;
};

// 5. Delete Current User Account
export const deleteMyAccount = async () => {
  const res = await api.delete('/users/me');
  return res.data;
};


// 2. ADMINISTRATIVE USER MANAGEMENT (ADMIN ONLY)

// 6. Fetch All Registered Users
export const getAllUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

// 7. Fetch Single User Details By ID
export const getUserById = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

// 8. Administrative Update On Any User Instance
export const updateAnyUser = async (userId, payload) => {
  const res = await api.put(`/users/${userId}`, payload);
  return res.data;
};

// 9. Administrative Hard-Delete On Any User Instance
export const deleteUser = async (userId) => {
  const res = await api.delete(`/users/${userId}`);
  return res.data;
};