function BrandLogo({ titleClassName = 'text-3xl font-extrabold tracking-wide text-white' }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/medical-logo.png"
        alt="Online Medical System logo"
        className="logo-eco-motion h-11 w-11 rounded-xl border border-white/40 bg-white/20 p-1 shadow-sm backdrop-blur-sm"
      />
      <span className={`${titleClassName} logo-title-shimmer logo-title-unique`}>Online Medical System</span>
    </div>
  );
}

export default BrandLogo;
