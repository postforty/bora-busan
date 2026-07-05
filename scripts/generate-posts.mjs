import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

if (!fs.existsSync(contentDirectory)) {
  console.warn('Blog content directory not found');
  fs.writeFileSync(
    path.join(process.cwd(), 'src/lib/generated-posts.json'),
    JSON.stringify([], null, 2)
  );
  process.exit(0);
}

const files = fs.readdirSync(contentDirectory);

const posts = files
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      frontmatter: data,
      content,
    };
  });

fs.writeFileSync(
  path.join(process.cwd(), 'src/lib/generated-posts.json'),
  JSON.stringify(posts, null, 2)
);
console.log(`Generated ${posts.length} posts.`);
