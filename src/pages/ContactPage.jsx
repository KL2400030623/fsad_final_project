function ContactPage() {
  return (
    <section className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Contact Us</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-100/80 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Support Desk</h3>
          <p className="mt-2 text-sm text-slate-600">Email: support@onlinemedicalsystem.local</p>
          <p className="mt-1 text-sm text-slate-600">Phone: +1 (555) 010-2026</p>
        </div>

        <div className="rounded-lg border border-teal-200 bg-teal-100/80 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Working Hours</h3>
          <p className="mt-2 text-sm text-slate-600">Monday - Friday: 8:00 AM - 8:00 PM</p>
          <p className="mt-1 text-sm text-slate-600">Saturday: 9:00 AM - 4:00 PM</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-100/80 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Head Office</h3>
        <p className="mt-2 text-sm text-slate-600">123 Health Avenue, Care City, CA 94000</p>
      </div>
    </section>
  );
}

export default ContactPage;
