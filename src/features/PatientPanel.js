import Section from '../components/Section';
import StatusPill from '../components/StatusPill';

function PatientPanel({
  handleBookAppointment,
  bookingForm,
  setBookingForm,
  doctors,
  patientAppointments,
  patientRecords,
  patientLabs,
  patientPrescriptions,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Section title="Book Virtual Appointment">
        <form onSubmit={handleBookAppointment} className="space-y-3">
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            value={bookingForm.doctor}
            onChange={(event) => setBookingForm((current) => ({ ...current, doctor: event.target.value }))}
          >
            {doctors.map((doctor) => (
              <option key={doctor} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              className="rounded-lg border border-slate-300 px-3 py-2"
              value={bookingForm.date}
              onChange={(event) => setBookingForm((current) => ({ ...current, date: event.target.value }))}
            />
            <input
              type="time"
              className="rounded-lg border border-slate-300 px-3 py-2"
              value={bookingForm.time}
              onChange={(event) => setBookingForm((current) => ({ ...current, time: event.target.value }))}
            />
          </div>
          <textarea
            rows="2"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Reason for consultation"
            value={bookingForm.reason}
            onChange={(event) => setBookingForm((current) => ({ ...current, reason: event.target.value }))}
          />
          <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white">
            Book Appointment
          </button>
        </form>
      </Section>

      <Section title="My Appointments">
        <div className="space-y-3">
          {patientAppointments.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{item.doctor}</p>
                <StatusPill value={item.status} />
              </div>
              <p className="text-sm text-slate-600">
                {item.date} at {item.time}
              </p>
              <p className="text-sm text-slate-600">{item.reason}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Medical Record">
        {patientRecords ? (
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Blood Type:</span> {patientRecords.bloodType}
            </p>
            <p>
              <span className="font-semibold">Allergies:</span> {patientRecords.allergies}
            </p>
            <p>
              <span className="font-semibold">Conditions:</span> {patientRecords.conditions}
            </p>
            <p>
              <span className="font-semibold">Last Visit:</span> {patientRecords.lastVisit}
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-600">No record found.</p>
        )}
      </Section>

      <Section title="Lab Reports & Prescriptions">
        <div className="space-y-3">
          {patientLabs.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{item.test}</p>
                <StatusPill value={item.status} />
              </div>
              <p className="text-sm text-slate-600">{item.date}</p>
              <p className="text-sm text-slate-600">{item.result}</p>
            </div>
          ))}
          {patientPrescriptions.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{item.medication}</p>
                <StatusPill value={item.status} />
              </div>
              <p className="text-sm text-slate-600">{item.dosage}</p>
              <p className="text-sm text-slate-600">{item.instructions}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default PatientPanel;