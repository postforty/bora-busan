export default function supabaseImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If the image is not from Supabase Storage, return it with a dummy width param 
  // to satisfy Next.js's "loader must implement width" requirement without breaking the external URL.
  if (!src.includes('supabase.co/storage/v1/object/public/')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      return url.href;
    } catch {
      return src; // Fallback if src is not a valid URL
    }
  }

  // Next.js standard sizes: 16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840
  // Supabase Image Transformations uses URL parameters: ?width=800&quality=75
  const url = new URL(src);
  url.searchParams.set('width', width.toString());
  
  if (quality) {
    url.searchParams.set('quality', quality.toString());
  } else {
    url.searchParams.set('quality', '75'); // Default quality
  }
  
  url.searchParams.set('resize', 'contain'); // or cover, based on use case

  return url.href;
}
