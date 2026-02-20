import Section from '../components/Section';

function AdminPanel({ users, roleLabels, setUsers, platformSettings, setPlatformSettings, onResetDemoData }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Section title="User Accounts">
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-slate-500">{roleLabels[user.role]}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setUsers((current) =>
                    current.map((item) =>
                      item.id === user.id
                        ? {
                            ...item,
                            active: !item.active,
                          }
                        : item
                    )
                  )
                }
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  user.active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {user.active ? 'Active' : 'Inactive'}
              </button>
            </div>
          ))}
        </div>
      </Section>

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

          <button
            type="button"
            className="w-full rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white"
            onClick={onResetDemoData}
          >
            Reset Demo Data
          </button>
        </div>
      </Section>
    </div>
  );
}

export default AdminPanel;