export const roleLabels = {
  admin: 'Admin',
  doctor: 'Doctor',
  patient: 'Patient',
  pharmacist: 'Pharmacist',
};

export const staffByRole = {
  admin: ['Platform Admin'],
  doctor: ['Dr. Maya Patel', 'Dr. Khaled Ahmed'],
  patient: ['Alice Brown', 'John Mensah'],
  pharmacist: ['Pharm. Lena Kim'],
};

export const initialUsers = [
  { id: 1, name: 'Platform Admin', role: 'admin', active: true },
  { id: 2, name: 'Dr. Maya Patel', role: 'doctor', active: true },
  { id: 3, name: 'Dr. Khaled Ahmed', role: 'doctor', active: true },
  { id: 4, name: 'Alice Brown', role: 'patient', active: true },
  { id: 5, name: 'John Mensah', role: 'patient', active: true },
  { id: 6, name: 'Pharm. Lena Kim', role: 'pharmacist', active: true },
];

export const initialAppointments = [
  {
    id: 1,
    patient: 'Alice Brown',
    doctor: 'Dr. Maya Patel',
    date: '2026-02-21',
    time: '10:30',
    reason: 'Follow-up on blood pressure',
    status: 'Booked',
    meetingLink: 'https://telemed.example.com/room/A1',
    consultationNote: '',
  },
  {
    id: 2,
    patient: 'John Mensah',
    doctor: 'Dr. Khaled Ahmed',
    date: '2026-02-21',
    time: '14:00',
    reason: 'Skin allergy assessment',
    status: 'Booked',
    meetingLink: 'https://telemed.example.com/room/J2',
    consultationNote: '',
  },
];

export const initialRecords = [
  {
    patient: 'Alice Brown',
    bloodType: 'A+',
    allergies: 'Penicillin',
    conditions: 'Hypertension',
    lastVisit: '2026-01-12',
  },
  {
    patient: 'John Mensah',
    bloodType: 'O-',
    allergies: 'None',
    conditions: 'Seasonal dermatitis',
    lastVisit: '2026-01-28',
  },
];

export const initialLabReports = [
  {
    id: 1,
    patient: 'Alice Brown',
    test: 'Lipid Profile',
    date: '2026-02-10',
    result: 'Borderline high LDL',
    status: 'Reviewed',
  },
  {
    id: 2,
    patient: 'John Mensah',
    test: 'IgE Panel',
    date: '2026-02-11',
    result: 'Mild pollen sensitivity',
    status: 'Reviewed',
  },
];

export const initialPrescriptions = [
  {
    id: 1,
    patient: 'Alice Brown',
    doctor: 'Dr. Maya Patel',
    medication: 'Amlodipine 5mg',
    dosage: '1 tablet daily',
    instructions: 'Take after breakfast',
    status: 'Pending Fulfillment',
    pharmacistNote: '',
  },
];