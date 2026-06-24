import React, { useEffect, useState } from 'react';
import { getCurrentUser, updateMyProfile } from '../../../API/AuthAPI.js';

const Profile = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getCurrentUser();

        setFormData({
          full_name: user.full_name || '',
          email: user.email || '',
        });
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const updatedUser = await updateMyProfile(formData);

setFormData({
  full_name: updatedUser.full_name || '',
  email: updatedUser.email || '',
});
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-on-surface">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto bg-surface-container border border-outline-variant rounded-3xl p-4 sm:p-6 lg:p-10">

      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-on-surface">
          Account Settings
        </h1>

        <p className="text-on-surface-variant mt-2">
          Update your account information.
        </p>
      </div>

      {message && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-primary/10 text-primary p-4 font-bold">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl border border-error/30 bg-error/10 text-error p-4 font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-bold text-on-surface-variant mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full rounded-xl bg-surface-container-low border border-outline-variant px-4 py-3 text-on-surface outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface-variant mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl bg-surface-container-low border border-outline-variant px-4 py-3 text-on-surface outline-none focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto bg-primary text-on-primary font-bold px-6 py-3 rounded-xl disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>

      </form>
    </section>
  );
};

export default Profile;