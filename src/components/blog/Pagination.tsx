"use client";

import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages?: number;
  basePath?: string;
}

export default function Pagination({
  totalPages = 10,
  basePath = "/blog",
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPage = pageParam && !isNaN(Number(pageParam)) && Number(pageParam) > 0 ? Number(pageParam) : 1;

  if (totalPages <= 1) return null;

  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l: number | undefined;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  const createUrl = (page: number) => {
    const hasQuery = basePath.includes("?");
    return `${basePath}${hasQuery ? "&" : "?"}page=${page}`;
  };

  return (
    <nav className="mt-16 flex items-center justify-center gap-2 px-container-margin-mobile">
      {currentPage > 1 ? (
        <Link href={createUrl(currentPage - 1)} className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary-fixed transition-colors">
          <span className="material-symbols-outlined">chevron_left</span>
        </Link>
      ) : (
        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-surface-variant/30 text-surface-variant/30 cursor-not-allowed">
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
      )}

      {rangeWithDots.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <span key={`dot-${index}`} className="text-on-surface-variant font-label-bold px-1">...</span>
          );
        }

        const isCurrent = pageNumber === currentPage;

        if (isCurrent) {
          return (
            <span key={pageNumber} className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-on-primary font-label-bold shadow-[0_0_15px_rgba(107,33,168,0.1)]">
              {pageNumber}
            </span>
          );
        }

        return (
          <Link
            key={pageNumber}
            href={createUrl(pageNumber as number)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant font-label-bold hover:bg-surface-container-high hover:shadow-[0_0_15px_rgba(107,33,168,0.1)] transition-all"
          >
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link href={createUrl(currentPage + 1)} className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary-fixed transition-colors">
          <span className="material-symbols-outlined">chevron_right</span>
        </Link>
      ) : (
        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-surface-variant/30 text-surface-variant/30 cursor-not-allowed">
          <span className="material-symbols-outlined">chevron_right</span>
        </div>
      )}
    </nav>
  );
}
