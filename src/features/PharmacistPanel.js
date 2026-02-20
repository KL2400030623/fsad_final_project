import Section from '../components/Section';
import StatusPill from '../components/StatusPill';

function PharmacistPanel({ prescriptions, pharmacistNotes, setPharmacistNotes, markDispensed }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Section title="E-Prescriptions Queue">
        <div className="space-y-3">
          {prescriptions.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{item.patient}</p>
                <StatusPill value={item.status} />
              </div>
              <p className="text-sm text-slate-600">
                {item.medication} · {item.dosage}
              </p>
              <p className="text-sm text-slate-600">{item.instructions}</p>
              <textarea
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                rows="2"
                placeholder="Medication counseling note"
                value={pharmacistNotes[item.id] ?? item.pharmacistNote}
                onChange={(event) =>
                  setPharmacistNotes((current) => ({
                    ...current,
                    [item.id]: event.target.value,
                  }))
                }
              />
              {item.status !== 'Dispensed' && (
                <button
                  type="button"
                  className="mt-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
                  onClick={() => markDispensed(item.id)}
                >
                  Mark as Dispensed
                </button>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Medication Information">
        <ul className="space-y-3 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-200 p-3">
            <p className="font-semibold">Amlodipine</p>
            <p>Use: Hypertension control. Counsel on dizziness and regular blood pressure checks.</p>
          </li>
          <li className="rounded-lg border border-slate-200 p-3">
            <p className="font-semibold">Cetirizine</p>
            <p>Use: Allergy relief. Usually once daily, may cause mild drowsiness.</p>
          </li>
          <li className="rounded-lg border border-slate-200 p-3">
            <p className="font-semibold">Metformin</p>
            <p>Use: Blood glucose control. Take with meals and monitor GI side effects.</p>
          </li>
        </ul>
      </Section>
    </div>
  );
}

export default PharmacistPanel;