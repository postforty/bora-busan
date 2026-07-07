'use client'

import { useState } from 'react';
import { createPost } from '@/app/actions/blog';
import MDXEditor from '@/components/blog/MDXEditor';

export default function WriteForm() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      formData.append('content', content);
      
      await createPost(formData);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-4xl mx-auto p-8 bg-white shadow-sm rounded-xl">
      <h1 className="text-3xl font-bold mb-4">Write a New Post</h1>
      
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input name="title" required className="border p-2 w-full rounded" placeholder="Enter post title" />
      </div>

      <div>
        <label className="block font-medium mb-1">Slug</label>
        <input name="slug" required className="border p-2 w-full rounded" placeholder="my-awesome-post" />
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea name="description" required className="border p-2 w-full rounded" rows={3} placeholder="A short summary of the post"></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select name="category" className="border p-2 w-full rounded">
            <option value="K-Pop Pilgrimage">K-Pop Pilgrimage</option>
            <option value="Cafe Tour">Cafe Tour</option>
            <option value="Coastal Life">Coastal Life</option>
            <option value="Foodie Finds">Foodie Finds</option>
            <option value="Arts & Design">Arts & Design</option>
            <option value="Events">Events</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Badge Type</label>
          <select name="badge_type" className="border p-2 w-full rounded">
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Thumbnail Image</label>
        <input type="file" name="imageFile" accept="image/*" required className="border p-2 w-full rounded" />
      </div>

      <div>
        <label className="block font-medium mb-1">Content (Markdown)</label>
        <MDXEditor value={content} onChange={(val) => setContent(val || '')} />
      </div>

      <button disabled={loading} type="submit" className="mt-4 bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors">
        {loading ? 'Publishing...' : 'Publish Post'}
      </button>
    </form>
  )
}
