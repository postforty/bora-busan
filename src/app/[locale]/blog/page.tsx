import BlogHero from "@/components/blog/BlogHero";
import BlogListClient from "@/components/blog/BlogListClient";
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
    <div className="pt-32 pb-section-gap relative">
      <BlogHero />
      <BlogListClient posts={posts || []} locale={locale} totalPages={totalPages} />
    </div>
  );
}
