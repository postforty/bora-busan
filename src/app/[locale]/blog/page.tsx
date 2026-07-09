import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, post_translations!inner(*)")
    .eq("post_translations.locale", locale)
    .neq("category", "Policy")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load posts:", error);
  }

  const totalPages = 1; // Simplified for now

  return (
    <div className="pt-32 pb-section-gap">
      <BlogHero />
      <section className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-8">
          {posts?.map((post) => {
            const translation = post.post_translations?.[0];
            if (!translation) return null;
            return (
              <BlogCard 
                key={post.id} 
                title={translation.title}
                description={translation.description}
                date={new Date(post.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                category={post.category}
                imageUrl={post.image_url}
                likes={post.likes.toString()}
                views={post.views?.toString() || "0"}
                badgeType={post.badge_type as "primary" | "secondary"}
                href={`/blog/${post.slug}`}
              />
            );
          })}
        </div>
      </section>
      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} basePath="/blog" />
      </Suspense>
    </div>
  );
}
