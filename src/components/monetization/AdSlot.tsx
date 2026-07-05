export default function AdSlot() {
  return (
    <div className="w-full my-12 bg-surface-container-low border border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center py-6 px-4">
      <div className="text-on-surface-variant/50 text-[10px] uppercase tracking-widest font-bold mb-3">Advertisement</div>
      <div className="w-full max-w-[728px] h-[90px] bg-surface-variant/30 rounded-lg border-2 border-dashed border-outline-variant/50 flex items-center justify-center">
        <span className="text-on-surface-variant/70 text-sm text-center px-4">
          Space reserved for Google AdSense<br />(Responsive Display Ad)
        </span>
      </div>
    </div>
  );
}
