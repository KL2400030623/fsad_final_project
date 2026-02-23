function AboutPage() {
  return (
    <section className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-900">About Online Medical System</h2>
      <p className="mt-4 text-lg leading-relaxed text-slate-700">
        Online Medical System is a healthcare management platform designed to connect patients, doctors,
        pharmacists, and administrators in one secure workspace.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-indigo-200 bg-indigo-100/80 p-6 md:aspect-square">
          <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
          <p className="mt-4 text-base leading-relaxed text-slate-700">Deliver faster, safer, and better coordinated digital healthcare services.</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-100/80 p-6 md:aspect-square">
          <h3 className="text-xl font-bold text-slate-900">Core Services</h3>
          <p className="mt-4 text-base leading-relaxed text-slate-700">Patient registration, appointment flow, clinical records, and prescription support.</p>
        </div>
        <div className="rounded-xl border border-cyan-200 bg-cyan-100/80 p-6 md:aspect-square">
          <h3 className="text-xl font-bold text-slate-900">Data Protection</h3>
          <p className="mt-4 text-base leading-relaxed text-slate-700">Role-based access, secure handling of data, and operational audit readiness.</p>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
