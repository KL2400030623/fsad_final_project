import Section from '../components/Section';
import StatusPill from '../components/StatusPill';

function PharmacistPanel({ prescriptions, pharmacistNotes, setPharmacistNotes, markDispensed }) {
  const pendingPrescriptions = prescriptions.filter((item) => item.status === 'Pending Fulfillment');
  const dispensedPrescriptions = prescriptions.filter((item) => item.status === 'Dispensed');

  const totalRevenue = prescriptions
    .filter((item) => item.status === 'Dispensed')
    .reduce((sum, item) => sum + (item.totalCost || 0), 0);

  const pendingRevenue = prescriptions
    .filter((item) => item.status === 'Pending Fulfillment')
    .reduce((sum, item) => sum + (item.totalCost || 0), 0);

  return (
    <div className="space-y-6">
      {/* Revenue Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-blue-50 p-4">
          <p className="text-sm text-slate-600">Pending Orders</p>
          <p className="text-2xl font-bold text-blue-600">{pendingPrescriptions.length}</p>
          <p className="text-xs text-slate-500 mt-1">Value: ${pendingRevenue.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-emerald-50 p-4">
          <p className="text-sm text-slate-600">Dispensed Today</p>
          <p className="text-2xl font-bold text-emerald-600">{dispensedPrescriptions.length}</p>
          <p className="text-xs text-slate-500 mt-1">Revenue: ${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-purple-50 p-4">
          <p className="text-sm text-slate-600">Total Prescriptions</p>
          <p className="text-2xl font-bold text-purple-600">{prescriptions.length}</p>
          <p className="text-xs text-slate-500 mt-1">Total: ${(pendingRevenue + totalRevenue).toFixed(2)}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="E-Prescriptions Queue">
          <div className="space-y-4">
            {prescriptions.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">No prescriptions to display</p>
            )}
            {prescriptions.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg text-slate-900">{item.patient}</p>
                    <p className="text-xs text-slate-500">
                      Age: {item.patientAge || 'N/A'} | Contact: {item.patientContact || 'N/A'}
                    </p>
                    <p className="text-xs text-slate-500">Prescribed by: {item.doctor}</p>
                    <p className="text-xs text-slate-500">Date: {item.date}</p>
                  </div>
                  <StatusPill value={item.status} />
                </div>

                {/* Medication Details */}
                <div className="rounded-lg bg-slate-50 p-3 mb-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">Medication</p>
                      <p className="font-medium text-slate-900">{item.medication}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Dosage</p>
                      <p className="font-medium text-slate-900">{item.dosage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Quantity</p>
                      <p className="font-medium text-slate-900">{item.quantity || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Unit Price</p>
                      <p className="font-medium text-slate-900">${(item.unitPrice || 0).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <p className="text-xs text-slate-500">Instructions</p>
                    <p className="text-sm text-slate-700">{item.instructions}</p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center">
                    <p className="text-sm font-semibold text-slate-600">Total Cost:</p>
                    <p className="text-xl font-bold text-emerald-600">${(item.totalCost || 0).toFixed(2)}</p>
                  </div>
                </div>

                {/* Pharmacist Notes */}
                <textarea
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows="2"
                  placeholder="Add medication counseling notes or special instructions..."
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
                    className="mt-3 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
                    onClick={() => markDispensed(item.id)}
                  >
                    ✓ Mark as Dispensed
                  </button>
                )}

                {item.status === 'Dispensed' && item.pharmacistNote && (
                  <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-200 p-2">
                    <p className="text-xs font-semibold text-emerald-700">Dispensing Notes:</p>
                    <p className="text-sm text-emerald-900">{item.pharmacistNote}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Medication Information">
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="rounded-lg border border-slate-200 p-3 bg-white">
              <p className="font-semibold text-slate-900">Amlodipine (Calcium Channel Blocker)</p>
              <p className="text-slate-600 mt-1">Use: Hypertension control. Counsel on dizziness and regular blood pressure checks.</p>
              <p className="text-xs text-slate-500 mt-1">Price: $2.50-$3.00 per tablet</p>
            </li>
            <li className="rounded-lg border border-slate-200 p-3 bg-white">
              <p className="font-semibold text-slate-900">Cetirizine (Antihistamine)</p>
              <p className="text-slate-600 mt-1">Use: Allergy relief. Usually once daily, may cause mild drowsiness.</p>
              <p className="text-xs text-slate-500 mt-1">Price: $1.50 per tablet</p>
            </li>
            <li className="rounded-lg border border-slate-200 p-3 bg-white">
              <p className="font-semibold text-slate-900">Metformin (Antidiabetic)</p>
              <p className="text-slate-600 mt-1">Use: Blood glucose control. Take with meals and monitor GI side effects.</p>
              <p className="text-xs text-slate-500 mt-1">Price: $1.80-$2.20 per tablet</p>
            </li>
            <li className="rounded-lg border border-slate-200 p-3 bg-white">
              <p className="font-semibold text-slate-900">Lisinopril (ACE Inhibitor)</p>
              <p className="text-slate-600 mt-1">Use: Hypertension and heart failure management. Monitor for dry cough.</p>
              <p className="text-xs text-slate-500 mt-1">Price: $2.80-$3.50 per tablet</p>
            </li>
            <li className="rounded-lg border border-slate-200 p-3 bg-white">
              <p className="font-semibold text-slate-900">Atorvastatin (Statin)</p>
              <p className="text-slate-600 mt-1">Use: Cholesterol management. Take at bedtime, monitor liver function.</p>
              <p className="text-xs text-slate-500 mt-1">Price: $4.00 per tablet</p>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
}

export default PharmacistPanel;