import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, getCurrentUser } from '../../../API/AuthAPI.js';
import { useAuth } from '../../../AuthFolder/AuthContext.jsx';
const AuthForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: ''
  });

  const handleChange = (e) => {
    setError('');

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      let data;

      if (mode === 'login') {
  data = await loginUser(form.email, form.password);

  const currentUser = await getCurrentUser();

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