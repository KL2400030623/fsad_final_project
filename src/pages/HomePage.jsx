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
    <main 
      className="min-h-screen px-4 pb-8 pt-28 text-slate-800 md:px-8 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.90)), url(https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Subtle Cursor Glow Effect */}
      <div
        className="pointer-events-none fixed z-50"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">

        {showCornerNav && (
          <section className={`fixed left-0 right-0 top-0 z-50 border-b border-indigo-400 bg-indigo-600/95 shadow-xl backdrop-blur-md transition-all duration-300 ${
            showTopNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}>
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 md:gap-8">
              <NavLink
                to="/"
                onClick={handleBrandClick}
                className="cursor-text"
              >
                <BrandLogo />
              </NavLink>
              <div className="flex items-center justify-end gap-6 md:gap-8">
              <NavLink
                to="/"
                className={({ isActive }) => `rounded-xl px-6 py-3 text-xl font-bold transition ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-emerald-400/80 text-white hover:bg-emerald-500'
                }`}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => `rounded-xl px-6 py-3 text-xl font-bold transition ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-amber-400/80 text-white hover:bg-amber-500'
                }`}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => `rounded-xl px-6 py-3 text-xl font-bold transition ${
                  isActive
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'bg-cyan-400/80 text-white hover:bg-cyan-500'
                }`}
              >
                Contact
              </NavLink>
              </div>
            </div>
          </section>
        )}

        {/* Staff Role Access Section */}
        <section className="rounded-xl bg-white/95 backdrop-blur-sm p-6 shadow-2xl border border-slate-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-xl font-bold text-slate-900 mb-4">{isAuthenticated ? 'Access Dashboards' : 'Staff Access'}</h3>
          <p className="text-sm text-slate-600 mb-4">{isAuthenticated ? 'Select a role to manage' : 'Login required for management roles'}</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {['admin', 'doctor', 'patient', 'pharmacist'].map((role) => (
              <NavLink
                key={role}
                to={isAuthenticated ? `/${role}` : '/login'}
                className="group flex flex-col items-center justify-center gap-3 rounded-xl bg-slate-100 p-6 text-center transition-all duration-300 hover:bg-slate-200 hover:shadow-lg hover:scale-105"
              >
                <span className="text-5xl">{ROLE_ICONS[role]}</span>
                <span className="font-semibold text-slate-900">{roleLabels[role]}</span>
                <span className="text-xs text-slate-500">{isAuthenticated ? 'Open Dashboard' : 'Click to Login'}</span>
              </NavLink>
            ))}
          </div>
        </section>

        {/* Patient Registration Section - Only show when not authenticated */}
        {!isAuthenticated && (
          <section className="rounded-xl bg-white/95 backdrop-blur-sm p-6 shadow-2xl border border-slate-200 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Patient Registration</h3>
            <p className="text-sm text-slate-600 mb-6">No login required - Register as a new patient</p>
            
            <PatientRegistrationPage
              doctors={doctors}
              setUsers={setUsers}
              users={users}
              embedded={true}
            />
          </section>
        )}
      </div>
    </main>
  );
}

export default HomePage;
