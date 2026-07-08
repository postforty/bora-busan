import { Link } from "@/i18n/routing";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl: string;
  likes: string;
  views: string;
  badgeType: "primary" | "secondary" | "tertiary";
  href: string;
}

export default function BlogCard({
  title,
  description,
  date,
  category,
  imageUrl,
  likes,
  views,
  badgeType,
  href,
}: BlogCardProps) {
  let badgeBgClass = "bg-primary";
  let badgeTextClass = "text-on-primary";
  
  if (badgeType === "secondary") {
    badgeBgClass = "bg-[#873ec4]";
    badgeTextClass = "text-white";
  } else if (badgeType === "tertiary") {
    badgeBgClass = "bg-primary-fixed";
    badgeTextClass = "text-on-primary-fixed";
  }

  return (
    <Link href={href} className="block group/card outline-none h-full">
      <article className="group bg-surface-container-lowest rounded-2xl overflow-hidden editorial-card-shadow flex flex-col h-full transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-transparent group-focus-visible/card:ring-2 group-focus-visible/card:ring-primary/50">
        <div className="relative h-64 overflow-hidden">
          <Image 
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className={`absolute top-4 right-4 ${badgeBgClass} px-3 py-1 rounded-full`}>
            <span className={`${badgeTextClass} font-label-bold text-label-sm uppercase tracking-wider`}>{category}</span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <time className="text-label-sm font-label-sm text-on-surface-variant mb-2">{date}</time>
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-3 group-hover:text-primary transition-colors">{title}</h2>
          <p className="text-body-md font-body-md text-on-surface-variant line-clamp-2 mb-6">
            {description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="flex items-center text-primary font-label-bold text-label-bold">
              Read More
              <span className="material-symbols-outlined ml-1 text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </span>
            <div className="flex items-center text-on-surface-variant gap-3">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                <span className="font-label-md">{views}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">favorite</span>
                <span className="font-label-md">{likes}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
