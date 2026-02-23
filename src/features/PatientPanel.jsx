import { useState } from 'react';
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
  const [patientDetails, setPatientDetails] = useState({
    fullName: 'Alice Brown',
    dateOfBirth: '1985-06-15',
    gender: 'Female',
    phone: '+1-555-0123',
    email: 'alice.brown@email.com',
    address: '123 Main Street, City, State 12345',
    emergencyContact: 'John Brown - +1-555-0124 (Spouse)',
    insuranceProvider: 'HealthFirst Insurance',
    insuranceNumber: 'HF-123456789',
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [uploadedReports, setUploadedReports] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    // In a real app, this would save to backend/localStorage
    alert('Profile updated successfully!');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // Simulate file upload delay
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Pending Review',
        url: URL.createObjectURL(file), // In real app, this would be a server URL
      };

      setUploadedReports(prev => [...prev, newReport]);
      setIsUploading(false);
      alert('Report uploaded successfully! It will be reviewed by your healthcare provider.');
    }, 2000);
  };

  const handleDownloadReport = (report) => {
    // In a real app, this would download from server
    // For demo, we'll simulate download
    const link = document.createElement('a');
    link.href = report.url || '#';
    link.download = report.name || `lab-report-${report.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Section 
        title="Patient Profile" 
        rightContent={
          <button
            type="button"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            {isEditingProfile ? 'Cancel' : 'Edit Profile'}
          </button>
        }
      >
        {isEditingProfile ? (
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                value={patientDetails.fullName}
                onChange={(e) => setPatientDetails({ ...patientDetails, fullName: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={patientDetails.dateOfBirth}
                  onChange={(e) => setPatientDetails({ ...patientDetails, dateOfBirth: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                <select
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={patientDetails.gender}
                  onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value })}
                  required
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={patientDetails.phone}
                  onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={patientDetails.email}
                  onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <textarea
                rows="2"
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                value={patientDetails.address}
                onChange={(e) => setPatientDetails({ ...patientDetails, address: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Name - Phone (Relation)"
                value={patientDetails.emergencyContact}
                onChange={(e) => setPatientDetails({ ...patientDetails, emergencyContact: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Insurance Provider</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={patientDetails.insuranceProvider}
                  onChange={(e) => setPatientDetails({ ...patientDetails, insuranceProvider: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Insurance Number</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={patientDetails.insuranceNumber}
                  onChange={(e) => setPatientDetails({ ...patientDetails, insuranceNumber: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700">
              Save Profile
            </button>
          </form>
        ) : (
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">Name:</span> {patientDetails.fullName}</p>
            <p><span className="font-semibold">Date of Birth:</span> {patientDetails.dateOfBirth}</p>
            <p><span className="font-semibold">Gender:</span> {patientDetails.gender}</p>
            <p><span className="font-semibold">Phone:</span> {patientDetails.phone}</p>
            <p><span className="font-semibold">Email:</span> {patientDetails.email}</p>
            <p><span className="font-semibold">Address:</span> {patientDetails.address}</p>
            <p><span className="font-semibold">Emergency Contact:</span> {patientDetails.emergencyContact}</p>
            <p><span className="font-semibold">Insurance Provider:</span> {patientDetails.insuranceProvider}</p>
            <p><span className="font-semibold">Insurance Number:</span> {patientDetails.insuranceNumber}</p>
          </div>
        )}
      </Section>
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

      <Section 
        title="Lab Reports & Medical Records"
        rightContent={
          <div className="flex gap-2">
            <label className="cursor-pointer rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 transition">
              <span>{isUploading ? 'Uploading...' : '📤 Upload Report'}</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Official Lab Reports */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">📋 Official Lab Reports</h4>
            <div className="space-y-2">
              {patientLabs.map((item) => (
                <div key={item.id} className="rounded-lg border border-slate-200 p-3 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.test}</p>
                      <p className="text-sm text-slate-600">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusPill value={item.status} />
                      <button
                        type="button"
                        onClick={() => handleDownloadReport(item)}
                        className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 transition"
                        title="Download Report"
                      >
                        📥 Download
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-2">{item.result}</p>
                </div>
              ))}
              {patientLabs.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">No official lab reports available.</p>
              )}
            </div>
          </div>

          {/* Uploaded Reports */}
          {uploadedReports.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">📤 My Uploaded Reports</h4>
              <div className="space-y-2">
                {uploadedReports.map((report) => (
                  <div key={report.id} className="rounded-lg border border-slate-200 p-3 bg-blue-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{report.name}</p>
                        <p className="text-sm text-slate-600">Uploaded: {report.uploadDate}</p>
                        <p className="text-xs text-slate-500">
                          Size: {(report.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusPill value={report.status} />
                        <button
                          type="button"
                          onClick={() => handleDownloadReport(report)}
                          className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 transition"
                          title="Download Report"
                        >
                          📥 Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Instructions */}
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
            <h5 className="text-sm font-semibold text-blue-900 mb-2">📤 Upload Medical Reports</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Upload lab results, imaging reports, or other medical documents</li>
              <li>• Supported formats: PDF, JPG, PNG, DOC, DOCX</li>
              <li>• Files will be reviewed by your healthcare provider</li>
              <li>• Maximum file size: 10MB per document</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="My Prescriptions">
        <div className="space-y-3">
          {patientPrescriptions.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-4 bg-white shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg text-slate-900">{item.medication}</p>
                  <p className="text-xs text-slate-500">Prescribed by: {item.doctor} | Date: {item.date}</p>
                  {item.diagnosis && <p className="text-xs text-slate-500">Diagnosis: {item.diagnosis}</p>}
                </div>
                <StatusPill value={item.status} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <p className="text-xs text-slate-500">Dosage</p>
                  <p className="font-medium text-slate-900">{item.dosage}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Quantity</p>
                  <p className="font-medium text-slate-900">{item.quantity}</p>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-xs text-slate-500">Instructions</p>
                <p className="text-sm text-slate-700">{item.instructions}</p>
              </div>
              {item.pharmacistNote && (
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-2">
                  <p className="text-xs font-semibold text-blue-700">Pharmacist Notes:</p>
                  <p className="text-sm text-blue-900">{item.pharmacistNote}</p>
                </div>
              )}
            </div>
          ))}
          {patientPrescriptions.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-4">No prescriptions available.</p>
          )}
        </div>
      </Section>
    </div>
  );
}

export default PatientPanel;