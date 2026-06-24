/**
 * [ architectural concept ]: Centralized Identity & Access Management (IAM) Gateway.
 * [ purpose ]: Orchestrates dual-mode user session lifecycles (Authentication & Account Provisioning). 
 * Handles secure token integration, front-end password strength validation, and structured backend error parsing.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, getCurrentUser } from '../../../API/AuthAPI.js';
import { useAuth } from '../../../AuthFolder/AuthContext.jsx';
const AuthForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // 1. COMPONENT STATES: Managing switching modes, load indicators, error stacks, and form inputs
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: ''
  });

  // 2. INPUT SYNCHRONIZATION: Clears existing error states and captures dynamic field changes
  const handleChange = (e) => {
    setError('');

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
// 3. SECURE VALIDATION RULESET: Enforces complex password standards and email structures before network calls
  const validateRegister = () => {
    if (!form.full_name.trim()) {
      return 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      return 'Please enter a valid email address';
    }

    if (form.password.length < 8) {
      return 'Password must be at least 8 characters';
    }

    if (!/[A-Z]/.test(form.password)) {
      return 'Password must contain at least one uppercase letter';
    }

    if (!/[a-z]/.test(form.password)) {
      return 'Password must contain at least one lowercase letter';
    }

    if (!/\d/.test(form.password)) {
      return 'Password must contain at least one number';
    }

    return null;
  };

  // 4. TRANSACTION SUBMISSION PIPELINE: Manages either active session initialization or data generation
  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      let data;

      if (mode === 'login') {
  data = await loginUser(form.email, form.password);
  // Fetch specific profile data corresponding to the newly validated session token
  const currentUser = await getCurrentUser();

  // Commit credentials globally to the shared context state
  login(currentUser, data.access_token);

  navigate('/dashboard');
}


      else {
        const validationError = validateRegister();

        if (validationError) {
          setError(validationError);
          setLoading(false);
          return;
        }

        await registerUser({
          full_name: form.full_name,
          email: form.email,
          password: form.password
        });
        
        // Switch controller views back to authorization after registration succeeds
        setMode('login');

        setForm({
          email: form.email,
          password: '',
          full_name: ''
        });

        setError('Account created successfully. Please login.');
      }
    } catch (err) {
      console.error(err);
      // 5. BACKEND ERROR PARSING: Destructures structured response detail matrices from the API
      const backendError =
        err?.response?.data?.detail;

      if (Array.isArray(backendError)) {
        setError(
          backendError[0]?.msg || 'Validation error'
        );
      } else {
        setError(
          backendError || 'Authentication failed'
        );
      }
    } finally {
      setLoading(false);
    }
  };
// 6. MAIN AUTH CANVAS: Centered presentation viewport leveraging radial neon ambient backdrops
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container relative overflow-hidden">

      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />

      <div className="relative w-full max-w-md p-10 rounded-3xl border border-outline-variant bg-surface-container-low shadow-xl">

        <h2 className="text-3xl font-black text-center text-white mb-8">
          {mode === 'login'
            ? 'Welcome Back'
            : 'Create Account'}
        </h2>

        {mode === 'register' && (
          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded-xl bg-surface-container border border-outline-variant text-white placeholder-white/60 text-sm"
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl bg-surface-container border border-outline-variant text-white placeholder-white/60 text-sm"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-2 p-3 rounded-xl bg-surface-container border border-outline-variant text-white placeholder-white/60 text-sm"
        />

        {mode === 'register' && (
          <p className="text-xs text-white/60 mb-4">
            Password must contain:
            8+ characters, uppercase letter,
            lowercase letter, and a number.
          </p>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold bg-primary text-white hover:scale-[1.02] transition"
        >
          {loading
            ? 'Loading...'
            : mode === 'login'
            ? 'Login'
            : 'Register'}
        </button>

        <p className="text-center text-sm text-white/70 mt-6">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                className="text-white font-bold"
                onClick={() => {
                  setError('');
                  setMode('register');
                }}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-white font-bold"
                onClick={() => {
                  setError('');
                  setMode('login');
                }}
              >
                Login
              </button>
            </>
          )}
        </p>

      </div>
    </div>
  );
};

export default AuthForm;