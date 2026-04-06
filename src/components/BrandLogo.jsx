function BrandLogo({ 
  titleClassName = 'text-2xl font-extrabold tracking-wide text-slate-900',
  logoSize = 'h-12 w-auto',
  showTitle = true 
}) {
  return (
    <div className="flex items-center gap-3">
      <svg
        className={`${logoSize} transition-transform duration-300 hover:scale-105 drop-shadow-md`}
        viewBox="0 0 24 24"
        fill="url(#medical-gradient)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        <path d="M11 10H8.5v2H11v2.5h2V12h2.5v-2H13V7.5h-2V10z" fill="#ffffff"/>
        <defs>
          <linearGradient id="medical-gradient" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
      {showTitle && (
        <div>
          <h1 className={titleClassName}>
            Medi<span className="text-blue-500">Care+</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Healthcare Platform</p>
        </div>
      )}
    </div>
  );
}

export default BrandLogo;
