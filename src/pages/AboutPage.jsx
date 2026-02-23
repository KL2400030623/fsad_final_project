function AboutPage() {
  const companyValues = [
    { icon: '💙', title: 'Patient-First', description: 'Every decision centered on patient wellbeing' },
    { icon: '🔒', title: 'Security', description: 'Enterprise-grade encryption and compliance' },
    { icon: '🤝', title: 'Collaboration', description: 'Seamless coordination between care providers' },
    { icon: '⚡', title: 'Innovation', description: 'Always improving the healthcare experience' },
  ];

  const team = [
    { avatar: '👨‍💼', name: 'Dr. Rajesh Kumar', role: 'Founder & CEO', bio: '20+ years in healthcare technology' },
    { avatar: '👩‍💻', name: 'Sarah Chen', role: 'Chief Technology Officer', bio: 'Former Google engineer, healthcare specialist' },
    { avatar: '👨‍⚕️', name: 'Dr. Michael Brown', role: 'Medical Director', bio: 'Board-certified physician and advocate' },
    { avatar: '👩‍💼', name: 'Jennifer Lee', role: 'Chief Operating Officer', bio: 'Operations and compliance expert' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8 space-y-16">
        
        {/* Header */}
        <section className="space-y-6 pt-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900">About Our Platform</h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Transforming healthcare delivery through technology, making quality care accessible to everyone, everywhere.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center border-b border-slate-200 pb-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-lg text-slate-600">
              We believe healthcare should be simple, accessible, and efficient. Our platform bridges the gap between patients and medical professionals, creating a unified ecosystem that prioritizes care quality and patient satisfaction.
            </p>
            <div className="space-y-3 mt-6">
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🏥</span>
                <div>
                  <div className="font-bold text-slate-900">Healthcare Accessibility</div>
                  <div className="text-slate-600">Connect with medical professionals instantly</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">📊</span>
                <div>
                  <div className="font-bold text-slate-900">Data Management</div>
                  <div className="text-slate-600">Secure storage and easy access to medical records</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="font-bold text-slate-900">Operational Efficiency</div>
                  <div className="text-slate-600">Streamlined processes for healthcare providers</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-12 text-white text-center">
            <div className="text-7xl mb-4">🏥</div>
            <div className="text-3xl font-bold">Your Health, Our Priority</div>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-8">
          <h2 className="text-4xl font-bold text-slate-900 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {companyValues.map((value, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="space-y-8 border-t border-slate-200 pt-12">
          <h2 className="text-4xl font-bold text-slate-900 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition text-center">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-slate-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Statistics */}
        <section className="space-y-8 border-t border-slate-200 pt-12">
          <h2 className="text-4xl font-bold text-slate-900 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-emerald-600">50+</div>
              <div className="text-slate-600 font-semibold mt-2">Board-Certified Doctors</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-blue-600">10K+</div>
              <div className="text-slate-600 font-semibold mt-2">Active Patients</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-600">500K+</div>
              <div className="text-slate-600 font-semibold mt-2">Consultations Completed</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-amber-600">99.9%</div>
              <div className="text-slate-600 font-semibold mt-2">Platform Uptime</div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-8 border-t border-slate-200 pt-12">
          <h2 className="text-4xl font-bold text-slate-900 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">🏆 Trusted</h3>
              <p className="text-slate-600">Certified by leading healthcare regulatory bodies with proven track record</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">🛡️ Secure</h3>
              <p className="text-slate-600">HIPAA compliant with end-to-end encryption for complete data protection</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">🚀 Innovative</h3>
              <p className="text-slate-600">Cutting-edge technology continuously updated with latest healthcare standards</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center space-y-6 border-t border-slate-200 pt-12">
          <h2 className="text-4xl font-bold">Ready to Experience Better Healthcare?</h2>
          <p className="text-lg opacity-90">Join thousands of patients and healthcare professionals today</p>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
