import { useEffect, useMemo, useState } from 'react';
import './App.css';
import WorkspaceSummary from './components/WorkspaceSummary';
import AdminPanel from './features/AdminPanel';
import DoctorPanel from './features/DoctorPanel';
import PatientPanel from './features/PatientPanel';
import PharmacistPanel from './features/PharmacistPanel';
import {
  initialAppointments,
  initialLabReports,
  initialPrescriptions,
  initialRecords,
  initialUsers,
  roleLabels,
  staffByRole,
} from './constants/data';

const STORAGE_KEYS = {
  activeRole: 'oms.activeRole',
  activeActor: 'oms.activeActor',
  users: 'oms.users',
  appointments: 'oms.appointments',
  records: 'oms.records',
  prescriptions: 'oms.prescriptions',
  platformSettings: 'oms.platformSettings',
};

function getStoredValue(key, fallback) {
  let rawValue = null;
  try {
    rawValue = localStorage.getItem(key);
  } catch {
    return fallback;
  }

  if (!rawValue) {
    return fallback;
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return parsedValue ?? fallback;
  } catch {
    return fallback;
  }
}

function setStoredValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeStoredValue(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function App() {
  const defaultActiveActor = {
    admin: 'Platform Admin',
    doctor: 'Dr. Maya Patel',
    patient: 'Alice Brown',
    pharmacist: 'Pharm. Lena Kim',
  };

  const defaultPlatformSettings = {
    enforce2FA: true,
    encryptAtRest: true,
    retentionMonths: 24,
  };

  const defaultBookingForm = {
    doctor: 'Dr. Maya Patel',
    date: '2026-02-22',
    time: '09:00',
    reason: '',
  };

  const defaultNewPrescription = {
    patient: 'Alice Brown',
    medication: '',
    dosage: '',
    instructions: '',
  };

  const [activeRole, setActiveRole] = useState(() => getStoredValue(STORAGE_KEYS.activeRole, 'patient'));
  const [activeActor, setActiveActor] = useState(() => getStoredValue(STORAGE_KEYS.activeActor, defaultActiveActor));

  const [users, setUsers] = useState(() => getStoredValue(STORAGE_KEYS.users, initialUsers));
  const [appointments, setAppointments] = useState(() => getStoredValue(STORAGE_KEYS.appointments, initialAppointments));
  const [records, setRecords] = useState(() => getStoredValue(STORAGE_KEYS.records, initialRecords));
  const [labReports] = useState(initialLabReports);
  const [prescriptions, setPrescriptions] = useState(() => getStoredValue(STORAGE_KEYS.prescriptions, initialPrescriptions));

  const [platformSettings, setPlatformSettings] = useState(() =>
    getStoredValue(STORAGE_KEYS.platformSettings, defaultPlatformSettings)
  );

  const [bookingForm, setBookingForm] = useState(defaultBookingForm);

  const [newPrescription, setNewPrescription] = useState(defaultNewPrescription);

  const [consultationDrafts, setConsultationDrafts] = useState({});
  const [pharmacistNotes, setPharmacistNotes] = useState({});
  const [resetMessage, setResetMessage] = useState('');
  const [storageErrorMessage, setStorageErrorMessage] = useState('');

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.activeRole, activeRole);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [activeRole]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.activeActor, activeActor);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [activeActor]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.users, users);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [users]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.appointments, appointments);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [appointments]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.records, records);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [records]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.prescriptions, prescriptions);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [prescriptions]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.platformSettings, platformSettings);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [platformSettings]);

  useEffect(() => {
    if (!resetMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setResetMessage('');
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [resetMessage]);

  useEffect(() => {
    if (!storageErrorMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStorageErrorMessage('');
    }, 3500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [storageErrorMessage]);

  const counts = useMemo(
    () => ({
      users: users.length,
      appointments: appointments.length,
      pendingRx: prescriptions.filter((item) => item.status === 'Pending Fulfillment').length,
      reports: labReports.length,
    }),
    [users.length, appointments.length, prescriptions, labReports.length]
  );

  const currentActor = activeActor[activeRole];
  const doctorAppointments = appointments.filter((item) => item.doctor === activeActor.doctor);
  const patientAppointments = appointments.filter((item) => item.patient === activeActor.patient);
  const patientRecords = records.find((item) => item.patient === activeActor.patient);
  const patientLabs = labReports.filter((item) => item.patient === activeActor.patient);
  const patientPrescriptions = prescriptions.filter((item) => item.patient === activeActor.patient);

  const handleBookAppointment = (event) => {
    event.preventDefault();
    if (!bookingForm.reason.trim()) {
      return;
    }

    const nextId = appointments.length + 1;
    setAppointments((current) => [
      ...current,
      {
        id: nextId,
        patient: activeActor.patient,
        doctor: bookingForm.doctor,
        date: bookingForm.date,
        time: bookingForm.time,
        reason: bookingForm.reason,
        status: 'Booked',
        meetingLink: `https://telemed.example.com/room/${activeActor.patient.split(' ')[0]}${nextId}`,
        consultationNote: '',
      },
    ]);

    setBookingForm((current) => ({ ...current, reason: '' }));
  };

  const completeConsultation = (appointmentId) => {
    const note = consultationDrafts[appointmentId]?.trim();
    if (!note) {
      return;
    }

    setAppointments((current) =>
      current.map((item) =>
        item.id === appointmentId
          ? {
              ...item,
              status: 'Completed',
              consultationNote: note,
            }
          : item
      )
    );

    const appointment = appointments.find((item) => item.id === appointmentId);
    setRecords((current) =>
      current.map((record) =>
        record.patient === appointment.patient
          ? {
              ...record,
              conditions: `${record.conditions}; ${note}`,
              lastVisit: appointment.date,
            }
          : record
      )
    );
  };

  const createPrescription = (event) => {
    event.preventDefault();
    const { patient, medication, dosage, instructions } = newPrescription;
    if (!medication.trim() || !dosage.trim() || !instructions.trim()) {
      return;
    }

    const nextId = prescriptions.length + 1;
    setPrescriptions((current) => [
      ...current,
      {
        id: nextId,
        patient,
        doctor: activeActor.doctor,
        medication,
        dosage,
        instructions,
        status: 'Pending Fulfillment',
        pharmacistNote: '',
      },
    ]);

    setNewPrescription((current) => ({ ...current, medication: '', dosage: '', instructions: '' }));
  };

  const markDispensed = (prescriptionId) => {
    const note = pharmacistNotes[prescriptionId] || '';
    setPrescriptions((current) =>
      current.map((item) =>
        item.id === prescriptionId
          ? {
              ...item,
              status: 'Dispensed',
              pharmacistNote: note,
            }
          : item
      )
    );
  };

  const resetDemoData = () => {
    const shouldReset = window.confirm('Reset all demo data and restore defaults?');
    if (!shouldReset) {
      return;
    }

    const removedAll = Object.values(STORAGE_KEYS).every((key) => removeStoredValue(key));
    if (!removedAll) {
      setStorageErrorMessage('Unable to clear all saved data from browser storage.');
    }

    setActiveRole('patient');
    setActiveActor(defaultActiveActor);
    setUsers(initialUsers);
    setAppointments(initialAppointments);
    setRecords(initialRecords);
    setPrescriptions(initialPrescriptions);
    setPlatformSettings(defaultPlatformSettings);
    setBookingForm(defaultBookingForm);
    setNewPrescription(defaultNewPrescription);
    setConsultationDrafts({});
    setPharmacistNotes({});
    setResetMessage('Demo data reset successfully.');
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
          <p className="text-sm text-slate-200">FSAD-PS20</p>
          <h1 className="mt-1 text-2xl font-bold md:text-3xl">Online Medical System for Virtual Consultations</h1>
          <p className="mt-2 text-sm text-slate-300">
            Book appointments, run virtual consultations, issue e-prescriptions, and manage records with role-based access.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.keys(roleLabels).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRole(role)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeRole === role ? 'bg-white text-slate-900' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                {roleLabels[role]}
              </button>
            ))}
          </div>
        </header>

        <WorkspaceSummary
          activeRole={activeRole}
          roleLabels={roleLabels}
          currentActor={currentActor}
          staffOptions={staffByRole[activeRole]}
          setActiveActor={setActiveActor}
          counts={counts}
        />

        {resetMessage && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {resetMessage}
          </div>
        )}

        {storageErrorMessage && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {storageErrorMessage}
          </div>
        )}

        {activeRole === 'admin' && (
          <AdminPanel
            users={users}
            roleLabels={roleLabels}
            setUsers={setUsers}
            platformSettings={platformSettings}
            setPlatformSettings={setPlatformSettings}
            onResetDemoData={resetDemoData}
          />
        )}

        {activeRole === 'doctor' && (
          <DoctorPanel
            doctorAppointments={doctorAppointments}
            consultationDrafts={consultationDrafts}
            setConsultationDrafts={setConsultationDrafts}
            completeConsultation={completeConsultation}
            createPrescription={createPrescription}
            newPrescription={newPrescription}
            setNewPrescription={setNewPrescription}
            patients={staffByRole.patient}
          />
        )}

        {activeRole === 'patient' && (
          <PatientPanel
            handleBookAppointment={handleBookAppointment}
            bookingForm={bookingForm}
            setBookingForm={setBookingForm}
            doctors={staffByRole.doctor}
            patientAppointments={patientAppointments}
            patientRecords={patientRecords}
            patientLabs={patientLabs}
            patientPrescriptions={patientPrescriptions}
          />
        )}

        {activeRole === 'pharmacist' && (
          <PharmacistPanel
            prescriptions={prescriptions}
            pharmacistNotes={pharmacistNotes}
            setPharmacistNotes={setPharmacistNotes}
            markDispensed={markDispensed}
          />
        )}
      </div>
    </main>
  );
}

export default App;
