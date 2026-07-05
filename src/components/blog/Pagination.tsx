export default function Pagination() {
  return (
    <nav className="mt-16 flex items-center justify-center gap-2 px-container-margin-mobile">
      <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-secondary text-secondary hover:bg-secondary-fixed transition-colors">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="w-10 h-10 rounded-full bg-primary text-on-primary font-label-bold shadow-[0_0_15px_rgba(107,33,168,0.1)]">1</button>
      <button className="w-10 h-10 rounded-full text-on-surface-variant font-label-bold hover:bg-surface-container-high hover:shadow-[0_0_15px_rgba(107,33,168,0.1)] transition-all">2</button>
      <button className="w-10 h-10 rounded-full text-on-surface-variant font-label-bold hover:bg-surface-container-high hover:shadow-[0_0_15px_rgba(107,33,168,0.1)] transition-all">3</button>
      <span className="text-on-surface-variant font-label-bold px-1">...</span>
      <button className="w-10 h-10 rounded-full text-on-surface-variant font-label-bold hover:bg-surface-container-high hover:shadow-[0_0_15px_rgba(107,33,168,0.1)] transition-all">10</button>
      <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-secondary text-secondary hover:bg-secondary-fixed transition-colors">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  );
}
