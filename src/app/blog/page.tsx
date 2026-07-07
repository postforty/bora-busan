import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import { Suspense } from "react";
import { createClient } from "@supabase/supabase-js";

export default async function BlogPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
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
          {posts?.map((post) => (
            <BlogCard 
              key={post.id} 
              id={post.id}
              title={post.title}
              description={post.description}
              date={new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              category={post.category}
              imageUrl={post.image_url}
              likes={post.likes.toString()}
              badgeType={post.badge_type as "primary" | "secondary"}
              href={`/blog/${post.slug}`}
            />
          ))}
        </div>
      </section>
      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} basePath="/blog" />
      </Suspense>
    </div>
  );
}
