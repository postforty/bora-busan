import postsData from './generated-posts.json';

export async function getPostBySlug(slug: string) {
  const post = postsData.find((p) => p.slug === slug);
  if (!post) {
    throw new Error(`Post with slug ${slug} not found`);
  }
  return post;
}

export async function getAllPosts() {
  return [...postsData].sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

