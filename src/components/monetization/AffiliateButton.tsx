import Link from 'next/link';

interface AffiliateButtonProps {
  href: string;
  label: string;
  provider?: 'agoda' | 'klook' | 'default';
}

export default function AffiliateButton({ href, label, provider = 'default' }: AffiliateButtonProps) {
  const iconMap = {
    agoda: 'hotel',
    klook: 'local_activity',
    default: 'link'
  };

  return (
    <div className="w-full my-8 flex justify-center">
      <Link href={href} target="_blank" rel="noopener noreferrer" 
        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-surface-container-highest border border-outline-variant rounded-full shadow-[0_4px_20px_rgba(30,41,59,0.08)] hover:shadow-[0_8px_30px_rgba(107,33,168,0.12)] transition-all hover:-translate-y-1 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="material-symbols-outlined text-primary">{iconMap[provider]}</span>
        <span className="font-label-bold text-label-bold text-on-surface">{label}</span>
        <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/60 ml-2 px-2 py-1 bg-surface-variant/30 rounded-md">Sponsored</span>
      </Link>
    </div>
  );
}
