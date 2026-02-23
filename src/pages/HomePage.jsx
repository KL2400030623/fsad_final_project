import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PatientRegistrationPage from './PatientRegistrationPage';
import BrandLogo from '../components/BrandLogo';

const ROLE_ICONS = {
  admin: '⚙️',
  doctor: '🩺',
  patient: '👤',
  pharmacist: '💊',
};

const roleLabels = {
  admin: 'Admin',
  doctor: 'Doctor',
  patient: 'Patient Portal',
  pharmacist: 'Pharmacist',
};

const features = [
  {
    icon: '🏥',
    title: 'Integrated Healthcare',
    description: 'Seamless connection between patients, doctors, pharmacists, and administrators in one unified platform.',
  },
  {
    icon: '🔒',
    title: 'Secure & HIPAA Compliant',
    description: 'Enterprise-grade security with role-based access controls and encrypted data transmission.',
  },
  {
    icon: '📱',
    title: 'Anytime, Anywhere Access',
    description: 'Access your health records and appointments from any device, anytime you need.',
  },
  {
    icon: '⚡',
    title: 'Real-time Consultations',
    description: 'Connect with specialists instantly and get prescriptions delivered to your pharmacy.',
  },
  {
    icon: '📊',
    title: 'Medical Records Management',
    description: 'Complete digital storage of medical history, test results, and treatment plans.',
  },
  {
    icon: '🎯',
    title: 'Smart Appointment System',
    description: 'Intelligent scheduling that considers doctor availability and patient preferences.',
  },
];

const testimonials = [
  {
    name: 'Dr. Maya Patel',
    role: 'General Medicine Specialist',
    feedback: 'This platform has revolutionized how I manage patient care. The integrated system saves hours daily.',
    avatar: '👨‍⚕️',
  },
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    feedback: 'Finally, a healthcare system that\'s easy to use. I can access my records and book appointments in seconds.',
    avatar: '👩‍💼',
  },
  {
    name: 'Lena Kim',
    role: 'Pharmacist',
    feedback: 'The prescription management system is seamless. Patient safety has improved significantly.',
    avatar: '👩‍⚕️',
  },
];

function HomePage({ doctors, setUsers, users, isAuthenticated = false, onLogout = null, showCornerNav = true }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTopNav, setShowTopNav] = useState(true);
  const handleBrandClick = (event) => {
    if (window.location.pathname === '/') {
      event.preventDefault();
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopNav(window.scrollY <= 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Fixed Navigation */}
      {showCornerNav && (
        <section className={`fixed left-0 right-0 top-0 z-50 border-b border-indigo-200 bg-white/95 shadow-lg backdrop-blur-md transition-all duration-300 ${
          showTopNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 md:gap-8">
            <NavLink to="/" onClick={handleBrandClick} className="cursor-text">
              <BrandLogo />
            </NavLink>
            <div className="flex items-center justify-end gap-4 md:gap-8">
              <NavLink to="/about" className="rounded-lg px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">About</NavLink>
              <NavLink to="/contact" className="rounded-lg px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">Contact</NavLink>
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Hero Section */}
        <section className="space-y-8 pt-20 pb-16">
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Healthcare Made Simple
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
              Connect with doctors, manage prescriptions, and track your health - all in one secure platform
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <NavLink 
                to="/patient-registration"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105"
              >
                Register Now
              </NavLink>
              <NavLink 
                to="/about"
                className="bg-slate-200 text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-300 transition"
              >
                Learn More
              </NavLink>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
              <div className="text-4xl font-bold text-emerald-600">50+</div>
              <div className="text-slate-600 font-semibold mt-2">Licensed Doctors</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
              <div className="text-4xl font-bold text-blue-600">10,000+</div>
              <div className="text-slate-600 font-semibold mt-2">Active Patients</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
              <div className="text-4xl font-bold text-purple-600">24/7</div>
              <div className="text-slate-600 font-semibold mt-2">Available Support</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-8 py-16 border-t border-slate-200">
          <h2 className="text-4xl font-bold text-slate-900 text-center">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition hover:border-blue-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-8 py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-8">
          <h2 className="text-4xl font-bold text-slate-900 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6 items-center">
            <div className="text-center">
              <div className="bg-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-3">1</div>
              <h3 className="font-bold text-slate-900">Register</h3>
              <p className="text-sm text-slate-600 mt-2">Create your patient account safely</p>
            </div>
            <div className="hidden md:block text-center text-slate-400">→</div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-3">2</div>
              <h3 className="font-bold text-slate-900">Book Appointment</h3>
              <p className="text-sm text-slate-600 mt-2">Choose your preferred doctor</p>
            </div>
            <div className="hidden md:block text-center text-slate-400">→</div>
            <div className="text-center">
              <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-3">3</div>
              <h3 className="font-bold text-slate-900">Consult</h3>
              <p className="text-sm text-slate-600 mt-2">Get professional medical advice</p>
            </div>
            <div className="hidden md:block text-center text-slate-400">→</div>
            <div className="text-center">
              <div className="bg-amber-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-3">4</div>
              <h3 className="font-bold text-slate-900">Get Medication</h3>
              <p className="text-sm text-slate-600 mt-2">Prescriptions sent to pharmacy</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="space-y-8 py-16 border-t border-slate-200">
          <h2 className="text-4xl font-bold text-slate-900 text-center">What Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{testimonial.feedback}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard Access */}
        <section className="space-y-6 py-16 border-t border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Dashboard Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['admin', 'doctor', 'patient', 'pharmacist'].map((role) => (
              <NavLink
                key={role}
                to={isAuthenticated ? `/${role}` : '/'}
                className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-4 text-center transition hover:border-blue-500 hover:shadow-lg"
              >
                <span className="text-4xl">{ROLE_ICONS[role]}</span>
                <span className="font-semibold text-slate-900 text-sm">{roleLabels[role]}</span>
              </NavLink>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-lg opacity-90">Join thousands of patients receiving better healthcare today</p>
          <NavLink 
            to="/patient-registration"
            className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105"
          >
            Register as Patient
          </NavLink>
        </section>

        {/* Patient Registration Section - Embedded */}
        {!isAuthenticated && (
          <section className="py-16">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <PatientRegistrationPage
                doctors={doctors}
                setUsers={setUsers}
                users={users}
                embedded={true}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default HomePage;
