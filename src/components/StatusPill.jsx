function StatusPill({ value }) {
  const styleByValue = {
    Booked: 'bg-blue-100 text-blue-700',
    Pending: 'bg-amber-100 text-amber-700',
    Approved: 'bg-blue-100 text-blue-700',
    Rejected: 'bg-rose-100 text-rose-700',
    Completed: 'bg-emerald-100 text-emerald-700',
    'Pending Fulfillment': 'bg-amber-100 text-amber-700',
    Dispensed: 'bg-emerald-100 text-emerald-700',
    Reviewed: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styleByValue[value] || 'bg-slate-100 text-slate-700'}`}>
      {value}
    </span>
  );
}

export default StatusPill;