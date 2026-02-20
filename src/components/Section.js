function Section({ title, children, right }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

export default Section;