import React, { useEffect, useState } from 'react';
import { getAllUsers, updateAnyUser, deleteUser } from '../../../API/AuthAPI.js';
import { useAuth } from '../../../AuthFolder/AuthContext.jsx';

const UserManagement = () => {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (targetUser, newRole) => {
    try {
      setActionLoadingId(targetUser.id);
      setError('');
      setMessage('');

      const updatedUser = await updateAnyUser(targetUser.id, {
        full_name: targetUser.full_name,
        email: targetUser.email,
        role: newRole,
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === targetUser.id ? updatedUser : u))
      );

      setMessage('User role updated successfully.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update user role.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (targetUser) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${targetUser.full_name}?`
    );

    if (!confirmed) return;

    try {
      setActionLoadingId(targetUser.id);
      setError('');
      setMessage('');

      await deleteUser(targetUser.id);

      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
      setMessage('User deleted successfully.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete user.');
    } finally {
      setActionLoadingId(null);
    }
  };

  if (currentUser?.role !== 'admin') {
    return (
      <div className="rounded-2xl border border-error/30 bg-error/10 text-error p-6 font-bold">
        Admin access required.
      </div>
    );
  }

  return (
    <section className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-4xl font-black text-on-surface">
          User Management
        </h1>

        <p className="text-on-surface-variant mt-2">
          View users, update roles, and remove accounts.
        </p>
      </div>

      {message && (
        <div className="rounded-xl border border-primary/30 bg-primary/10 text-primary p-4 font-bold">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-error/30 bg-error/10 text-error p-4 font-bold">
          {error}
        </div>
      )}

      <div className="rounded-3xl border border-outline-variant bg-surface-container overflow-hidden">
        {loading ? (
          <div className="p-6 text-on-surface-variant">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-6 text-on-surface-variant">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th className="px-5 py-4 text-xs uppercase tracking-widest text-on-surface-variant">
                    Name
                  </th>
                  <th className="px-5 py-4 text-xs uppercase tracking-widest text-on-surface-variant">
                    Email
                  </th>
                  <th className="px-5 py-4 text-xs uppercase tracking-widest text-on-surface-variant">
                    Role
                  </th>
                  <th className="px-5 py-4 text-xs uppercase tracking-widest text-on-surface-variant">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((targetUser) => {
                  const isCurrentUser = targetUser.id === currentUser?.id;
                  const isBusy = actionLoadingId === targetUser.id;

                  return (
                    <tr
                      key={targetUser.id}
                      className="border-b border-outline-variant/40 last:border-b-0"
                    >
                      <td className="px-5 py-4 font-bold text-on-surface">
                        {targetUser.full_name}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs text-primary">You</span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-on-surface-variant">
                        {targetUser.email}
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={targetUser.role}
                          disabled={isBusy || isCurrentUser}
                          onChange={(e) =>
                            handleRoleChange(targetUser, e.target.value)
                          }
                          className="rounded-xl bg-surface-container-low border border-outline-variant px-3 py-2 text-on-surface outline-none"
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleDelete(targetUser)}
                          disabled={isBusy || isCurrentUser}
                          className="rounded-xl bg-error text-on-error px-4 py-2 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {isBusy ? 'Working...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserManagement;