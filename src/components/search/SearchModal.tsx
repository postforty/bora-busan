"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  image_url: string;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const router = useRouter();
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("recentSearches");
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load recent searches", e);
    }
  }, []);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches(prev => {
      const newSearches = [trimmed, ...prev.filter((t) => t !== trimmed)].slice(0, 10);
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
      return newSearches;
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "auto";
      setTimeout(() => {
        setSearchTerm("");
        setResults([]);
      }, 0);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const searchPosts = async () => {
      if (!debouncedSearchTerm.trim()) {
        setResults((prev) => prev.length > 0 ? [] : prev);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("post_translations")
          .select("title, description, posts!inner(id, category, slug, image_url)")
          .eq("locale", locale)
          .or(`title.ilike.%${debouncedSearchTerm}%,description.ilike.%${debouncedSearchTerm}%,content.ilike.%${debouncedSearchTerm}%`)
          .limit(10);

        if (error) {
          console.error("Search error:", error);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped = (data || []).map((row: any) => ({
            id: row.posts.id,
            title: row.title,
            description: row.description,
            category: row.posts.category,
            slug: row.posts.slug,
            image_url: row.posts.image_url
          }));
          setResults(mapped);
        }
      } catch (err) {
        console.error("Unexpected error during search:", err);
      } finally {
        setIsLoading(false);
      }
    };

    searchPosts();
  }, [debouncedSearchTerm, supabase, locale]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col pt-20 items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-surface/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-3xl px-4 animate-fade-in-up">
        <div className="bg-surface border border-outline-variant shadow-lg rounded-2xl overflow-hidden flex flex-col max-h-[80vh]">
          {/* Search Input */}
          <div className="flex items-center px-4 py-4 border-b border-outline-variant">
            <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="게시글 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchTerm.trim()) {
                  saveRecentSearch(searchTerm.trim());
                }
              }}
              className="flex-1 bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant font-body-lg"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="p-1 text-on-surface-variant hover:text-on-surface transition-colors rounded-full mr-2 flex items-center justify-center"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
            <button 
              onClick={onClose}
              className="px-3 py-1.5 text-sm font-label-md text-on-surface bg-surface-variant hover:bg-surface-variant/80 rounded-lg transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Search Results */}
          <div className="overflow-y-auto flex-1 min-h-[100px] max-h-[500px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="flex flex-col">
                {results.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => {
                      saveRecentSearch(debouncedSearchTerm);
                      router.push(`/blog/${post.slug}`);
                      onClose();
                    }}
                    className="flex flex-col sm:flex-row gap-4 p-4 hover:bg-surface-variant/50 transition-colors border-b border-outline-variant/30 last:border-0 text-left w-full"
                  >
                    {post.image_url && (
                      <div className="w-full sm:w-24 h-16 sm:h-20 flex-shrink-0 relative rounded-lg overflow-hidden hidden sm:block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={post.image_url} 
                          alt={post.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-label-md text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h4 className="font-title-md text-on-surface truncate mb-1">
                        {post.title}
                      </h4>
                      <p className="text-sm font-body-md text-on-surface-variant line-clamp-1">
                        {post.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : debouncedSearchTerm ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-3">search_off</span>
                <p className="font-body-lg text-on-surface">&quot;{searchTerm}&quot;에 대한 검색 결과가 없습니다.</p>
                <p className="font-body-md text-on-surface-variant mt-1">다른 검색어를 입력해 보세요.</p>
              </div>
            ) : (
              <div className="py-8 px-4">
                <div className="flex items-center justify-between mb-3 px-2">
                  <p className="text-sm font-label-md text-on-surface-variant">최근 검색어</p>
                  {recentSearches.length > 0 && (
                    <button 
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem("recentSearches");
                      }}
                      className="text-xs font-label-md text-on-surface-variant hover:text-primary transition-colors"
                    >
                      전체 삭제
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 px-2">
                  {recentSearches.length > 0 ? (
                    recentSearches.map((term, index) => (
                      <button 
                        key={index}
                        className="px-3 py-1.5 rounded-full bg-surface-variant/50 text-sm hover:bg-surface-variant transition-colors" 
                        onClick={() => setSearchTerm(term)}
                      >
                        {term}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-on-surface-variant/50">최근 검색어 내역이 없습니다.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
