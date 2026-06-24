/**
 * [ architectural concept ]: Centralized User Access & Identity Administration Panel.
 * [ purpose ]: Governs administrative CRUD privileges for the application's user database. 
 * Orchestrates dynamic role modifications, account purges, runtime action locking, and strict 
 * token-level security guards to block unauthorized access.
 */
import React, { useEffect, useState } from 'react';
import { getAllUsers, updateAnyUser, deleteUser } from '../../../API/AuthAPI.js';
import { useAuth } from '../../../AuthFolder/AuthContext.jsx';

const UserManagement = () => {
  // 1. IDENTITY DESTRUCTURING: Grabs current session metadata to prevent self-mutation loops
  const { user: currentUser } = useAuth();

  // 2. CORE COMPONENT STATES: Tracking system users, global indicators, and contextual action loaders
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);    // Locks specific table rows during async updates
  const [error, setError] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // 3. CATALOG FETCHING: Loads the master record registry containing all registered system accounts
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

  // 4. INITIALIZATION LIFECYCLE: Syncs registry records immediately when the panel mounts
  useEffect(() => {
    fetchUsers();
  }, []);


  // 5. PRIVILEGE MUTATION PIPELINE: Dispatches payload modifications to alter system access tiers
  const handleRoleChange = async (targetUser, newRole) => {
    try {
      setActionLoadingId(targetUser.id);
      setError('');
      setMessage('');

      // Optimistically update the single modified record inside the local collection array
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

  // 6. DELETION PIPELINE: Prompts confirmation, then permanently purges record indexes from the database
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

      // Instantly remove the deleted user index from the state vector array
      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
      setMessage('User deleted successfully.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete user.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // 7. SECURITY HARDENING GUARD: Restricts the execution context entirely to accounts with the 'admin' role token
  if (currentUser?.role !== 'admin') {
    return (
      <div className="rounded-2xl border border-error/30 bg-error/10 text-error p-6 font-bold">
        Admin access required.
      </div>
    );
  }

  return (
    // 8. MASTER VIEWPORT LAYER: Renders responsive administration metrics tables and interactive options
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