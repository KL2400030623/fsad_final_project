import Section from '../components/Section';
import StatusPill from '../components/StatusPill';

function DoctorPanel({
  doctorAppointments,
  consultationDrafts,
  setConsultationDrafts,
  completeConsultation,
  createPrescription,
  newPrescription,
  setNewPrescription,
  patients,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Section title="Virtual Consultations">
        <div className="space-y-4">
          {doctorAppointments.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{item.patient}</p>
                <StatusPill value={item.status} />
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {item.date} at {item.time} · {item.reason}
              </p>
              <a href={item.meetingLink} className="mt-2 inline-block text-sm font-medium text-indigo-600">
                Join virtual room
              </a>
              <textarea
                className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                rows="2"
                placeholder="Consultation summary"
                value={consultationDrafts[item.id] || item.consultationNote}
                onChange={(event) =>
                  setConsultationDrafts((current) => ({
                    ...current,
                    [item.id]: event.target.value,
                  }))
                }
              />
              <button
                type="button"
                onClick={() => completeConsultation(item.id)}
                className="mt-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
              >
                Complete Consultation
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Create E-Prescription">
        <form onSubmit={createPrescription} className="space-y-3">
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            value={newPrescription.patient}
            onChange={(event) => setNewPrescription((current) => ({ ...current, patient: event.target.value }))}
          >
            {patients.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Medication"
            value={newPrescription.medication}
            onChange={(event) => setNewPrescription((current) => ({ ...current, medication: event.target.value }))}
          />
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Dosage"
            value={newPrescription.dosage}
            onChange={(event) => setNewPrescription((current) => ({ ...current, dosage: event.target.value }))}
          />
          <textarea
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Instructions"
            rows="2"
            value={newPrescription.instructions}
            onChange={(event) => setNewPrescription((current) => ({ ...current, instructions: event.target.value }))}
          />
          <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white">
            Send to Pharmacy
          </button>
        </form>
      </Section>
    </div>
  );
}

export default DoctorPanel;