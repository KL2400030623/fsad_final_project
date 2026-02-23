import { useState } from 'react';
import Section from '../components/Section';

function AdminPanel({ users, roleLabels, setUsers, platformSettings, setPlatformSettings, onResetDemoData, activeSection, setActiveSection }) {
  const pendingUsers = users.filter((user) => user.status === 'Pending');
  const activeUsers = users.filter((user) => user.status === 'Active');

  const approveUser = (userId) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId ? { ...user, status: 'Active' } : user
      )
    );
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers((current) => current.filter((user) => user.id !== userId));
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  return (
    <div className="space-y-6">
        {/* Dashboard Overview Section */}
        {activeSection === 'dashboard' && (
          <div className="space-y-4">
            <Section title="System Overview">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4 border border-blue-200">
                  <p className="text-3xl font-bold text-blue-900">{activeUsers.length}</p>
                  <p className="text-sm text-blue-700">Active Users</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 p-4 border border-amber-200">
                  <p className="text-3xl font-bold text-amber-900">{pendingUsers.length}</p>
                  <p className="text-sm text-amber-700">Pending Approvals</p>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* User Accounts Section */}
        {activeSection === 'users' && (
          <div className="space-y-6">
            {/* Pending Approvals Section */}
            {pendingUsers.length > 0 && (
              <Section title="Pending Approvals">
                <div className="space-y-3">
                  <p className="text-sm text-slate-600 mb-4">
                    New staff accounts require admin approval before they can access the system.
                  </p>
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between rounded-lg border-2 border-amber-200 bg-amber-50 p-4">
                      <div>
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-600">{roleLabels[user.role]} • {user.contact}</p>
                        <span className="inline-block mt-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                          Awaiting Approval
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => approveUser(user.id)}
                          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
                        >
                          ✓ Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteUser(user.id)}
                          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Active Users Section */}
            <Section title="Active User Accounts">
              <div className="space-y-3">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-slate-500">{roleLabels[user.role]} • {user.contact}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleUserStatus(user.id)}
                        className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                          user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        }`}
                      >
                        {user.status === 'Active' ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteUser(user.id)}
                        className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
                        title="Delete User"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* Security Settings Section */}
        {activeSection === 'security' && (
          <Section title="Platform Security Settings">
            <div className="space-y-4">
              <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <span className="font-medium">Enforce Two-Factor Authentication</span>
                <input
                  type="checkbox"
                  checked={platformSettings.enforce2FA}
                  onChange={(event) =>
                    setPlatformSettings((current) => ({
                      ...current,
                      enforce2FA: event.target.checked,
                    }))
                  }
                />
              </label>

              <label className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <span className="font-medium">Encrypt Medical Data at Rest</span>
                <input
                  type="checkbox"
                  checked={platformSettings.encryptAtRest}
                  onChange={(event) =>
                    setPlatformSettings((current) => ({
                      ...current,
                      encryptAtRest: event.target.checked,
                    }))
                  }
                />
              </label>

              <label className="block rounded-lg border border-slate-200 p-3">
                <span className="font-medium">Data Retention (months)</span>
                <input
                  type="number"
                  min="12"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={platformSettings.retentionMonths}
                  onChange={(event) =>
                    setPlatformSettings((current) => ({
                      ...current,
                      retentionMonths: Number(event.target.value),
                    }))
                  }
                />
              </label>
            </div>
          </Section>
        )}

        {/* Data Controls Section */}
        {activeSection === 'data' && (
          <Section title="Data Controls">
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-rose-200 bg-rose-50 p-4">
                <p className="font-semibold text-rose-900 mb-3">⚠️ Danger Zone</p>
                <p className="text-sm text-rose-700 mb-4">Resetting demo data will clear all modifications and restore the system to its initial state.</p>
                <button
                  type="button"
                  className="w-full rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700"
                  onClick={onResetDemoData}
                >
                  🔄 Reset Demo Data
                </button>
              </div>
            </div>
          </Section>
        )}
      </div>
    );
  }

export default AdminPanel;