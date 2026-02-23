import { useState } from 'react';
import Section from '../components/Section';
import StatusPill from '../components/StatusPill';
import { medicationPricing } from '../constants/data';

function DoctorPanel({
  doctorAppointments,
  consultationDrafts,
  setConsultationDrafts,
  approveAppointment,
  rejectAppointment,
  completeConsultation,
  createPrescription,
  newPrescription,
  setNewPrescription,
  patients,
  prescriptionSuccessMessage,
}) {
  const [activeSection, setActiveSection] = useState('consultations');
  const [showPreview, setShowPreview] = useState(false);
  return (
    <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
      {/* Doctor Sidebar */}
      <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm h-fit">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Doctor Menu</h3>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection('consultations')}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeSection === 'consultations'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🩺 Virtual Consultations
          </button>
          <button
            onClick={() => setActiveSection('prescriptions')}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeSection === 'prescriptions'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            💊 Create E-Prescription
          </button>
          <button
            onClick={() => setActiveSection('followup')}
            className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeSection === 'followup'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📋 Patient Follow-up
          </button>
        </nav>
      </aside>

      {/* Doctor Content */}
      <main className="space-y-6">
        {prescriptionSuccessMessage && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {prescriptionSuccessMessage}
          </div>
        )}

        {/* Virtual Consultations Section */}
        {activeSection === 'consultations' && (
          <Section title="Virtual Consultations">
            <div className="mb-4 flex flex-wrap gap-2">
              <StatusPill value="Pending" />
              <StatusPill value="Approved" />
              <StatusPill value="Rejected" />
              <StatusPill value="Completed" />
            </div>
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

                  {item.status === 'Pending' && (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => approveAppointment(item.id)}
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => rejectAppointment(item.id)}
                        className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {item.status === 'Approved' && (
                    <>
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
                    </>
                  )}

                  {item.status === 'Rejected' && (
                    <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                      Appointment rejected.
                    </p>
                  )}

                  {item.status === 'Completed' && item.consultationNote && (
                    <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                      <p className="font-semibold">Consultation Summary</p>
                      <p>{item.consultationNote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Create E-Prescription Section */}
        {activeSection === 'prescriptions' && (
          <Section title="Create E-Prescription">
            <form onSubmit={createPrescription} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Patient</label>
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
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Diagnosis</label>
                <textarea
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Enter diagnosis details"
                  rows="3"
                  value={newPrescription.diagnosis}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, diagnosis: event.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medication</label>
                <select
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={newPrescription.medication}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, medication: event.target.value }))}
                >
                  {Object.keys(medicationPricing).map((med) => (
                    <option key={med} value={med}>
                      {med} - ${medicationPricing[med].unitPrice.toFixed(2)}/{medicationPricing[med].unit}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dosage</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="e.g., 1 tablet daily"
                  value={newPrescription.dosage}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, dosage: event.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Number of units"
                  min="1"
                  value={newPrescription.quantity}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, quantity: event.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Instructions</label>
                <textarea
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Special instructions for the patient"
                  rows="2"
                  value={newPrescription.instructions}
                  onChange={(event) => setNewPrescription((current) => ({ ...current, instructions: event.target.value }))}
                />
              </div>
              {newPrescription.medication && newPrescription.quantity && (
                <div className="rounded-lg bg-slate-100 p-3">
                  <p className="text-sm text-slate-600">Estimated Cost:</p>
                  <p className="text-xl font-bold text-slate-900">
                    ${(medicationPricing[newPrescription.medication]?.unitPrice * parseFloat(newPrescription.quantity || 0)).toFixed(2)}
                  </p>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="flex-1 rounded-lg bg-slate-600 px-4 py-2 font-semibold text-white hover:bg-slate-700 transition"
                >
                  Preview
                </button>
                <button type="submit" className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 transition">
                  Save Prescription
                </button>
              </div>
            </form>
          </Section>
        )}

        {/* Patient Follow-up Section */}
        {activeSection === 'followup' && (
          <Section title="Patient Follow-up">
            <div className="space-y-4">
              <p className="text-sm text-slate-600 mb-4">Track and manage patient follow-ups from recent consultations.</p>
              {doctorAppointments.filter(apt => apt.status === 'Completed').map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 p-4 bg-slate-50">
                  <p className="font-semibold text-slate-900">{item.patient}</p>
                  <p className="text-sm text-slate-600 mt-1">Consultation: {item.date} at {item.time}</p>
                  {item.consultationNote && (
                    <p className="text-sm text-slate-700 mt-2 p-2 bg-white rounded border border-slate-200">
                      {item.consultationNote}
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-3 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                  >
                    Schedule Follow-up
                  </button>
                </div>
              ))}
              {doctorAppointments.filter(apt => apt.status === 'Completed').length === 0 && (
                <p className="text-sm text-slate-500 text-center py-8">No completed consultations yet.</p>
              )}
            </div>
          </Section>
        )}
      </main>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Prescription Preview</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Patient:</strong> {newPrescription.patient}</p>
              <p><strong>Diagnosis:</strong> {newPrescription.diagnosis || 'N/A'}</p>
              <p><strong>Medication:</strong> {newPrescription.medication}</p>
              <p><strong>Dosage:</strong> {newPrescription.dosage}</p>
              <p><strong>Quantity:</strong> {newPrescription.quantity}</p>
              <p><strong>Instructions:</strong> {newPrescription.instructions}</p>
              <p><strong>Estimated Cost:</strong> ${(medicationPricing[newPrescription.medication]?.unitPrice * parseFloat(newPrescription.quantity || 0)).toFixed(2)}</p>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 rounded-lg bg-slate-600 px-4 py-2 font-semibold text-white hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorPanel;