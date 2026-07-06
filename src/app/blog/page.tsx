import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import { Suspense } from "react";

const mockPosts = [
  {
    id: 1,
    title: "5 Must-Visit BTS Spots in Busan",
    description: "From Jimin's childhood neighborhood to V's favorite beachside park, retrace the footsteps of icons in their hometown.",
    date: "October 24, 2024",
    category: "K-Pop Pilgrimage",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLutTD0SdOi3Hvnb1DSKpAJqvCIBfkcN95QmsP122RSRLi9FsGnIKlMpBPLLyFD4v2Wxrgsj_Ns85M6OOxNyEv74TcIalCkvZh782_XAzTHmAKLzQ9eFd5URlU493nz0ZTXqSROIIk0hcmYj-yMNBJJHDHSaZ48cZWOPPOK5AfCRRSZTVSdxWYRrCLUAc6WOYDynDAM1EF7KXP0EvAtaR-_DrJTjjnSrS_6MP2aY2SrbCEeqWfE-dBEnSrs",
    likes: "1.2k",
    badgeType: "primary" as const,
    href: "/blog/bts-busan-citizens-park",
  },
  {
    id: 2,
    title: "Exploring the Magic of Gamcheon",
    description: "Beyond the colorful rooftops lies a world of hidden specialty coffee shops and artisanal galleries waiting to be discovered.",
    date: "October 20, 2024",
    category: "Cafe Tour",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLt1op8sryocdiN4mstDROd_sl8EKbjkTWqsaaIP593gFrGoIAyy0r2udh5jJTAmARwYie1qkOADhq5PMmZbdBOLo3zwdBTwgYmfP0UK2wnASLs5cVR126yLs3Qkj5jsD1vUbCUNlQr3BIRKvVqXDHY1AAfQqkpTu-dfTdxMAjJKDQTwsv_WWZisZqb_nPQ5pg-BNhDxdo9dhLajdoqp1g1jILoy-FclCQCYwU-buZ1W1a7EJ9Bi9qSW5PU",
    likes: "856",
    badgeType: "secondary" as const,
    href: "#",
  },
  {
    id: 3,
    title: "Sunset Serenity at Dadaepo Beach",
    description: "Witness the most cinematic sunset in Korea at the edge of the city, where the Nakdong River meets the vast East Sea.",
    date: "October 15, 2024",
    category: "Coastal Life",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLvEc6MskFx2ytC0TdV2IfqRUpYU4AsHdbncI2VDUbEMLGLjGrZ3FpXZo6GTG_4iS4AITPpw4eUc9VjyjVR8GO1GyI6OzoRNpS3sdCUTsG7-BJ0omut4RqCLBChLB6SpqQfqrKTXb0CjM2qyXFzWf5OEOwCEaW8N-91FNDAdSzVxzsTZKNt13T4SCHbX20eNmTiPnAQV5h195TS5F8gb3RSADELYJBAvwT7LMcqGvCDeXBAd04_gZ0EMAA",
    likes: "2.4k",
    badgeType: "primary" as const,
    href: "#",
  },
  {
    id: 4,
    title: "The Modern Foodie's Guide to Gukje",
    description: "Navigating the historic market's new-wave street food stalls and upscale traditional dining experiences.",
    date: "October 12, 2024",
    category: "Foodie Finds",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf2vSKjCj9x7sVu6XRgLb2qKpMgi8e3CuqncNciRb58C648ICjqyOkb67Fyg0dpYGEmqRZ4Q51DXk-93Z4QUaco3t0kYfzgiSuJyrV9xi5cBb0h-p6b5Om2LfQIS-fvtQBRShF9PwJzR1tv9dplj775przYR9pn6W3lxm6C1THo1vnT9dq4kO6bN-D0IhIQHWsyQMR9LvgMypfEL41t-ySSA_u6qEbqsbYmzo2UUxtxqGMgYVqh3Y8cx9XX46lHSHzX9JD1cbnTbk",
    likes: "512",
    badgeType: "secondary" as const,
    href: "#",
  },
  {
    id: 5,
    title: "Architectural Marvels of Centum City",
    description: "A deep dive into the world-class design and futuristic skyline that defines Busan's business and art district.",
    date: "October 08, 2024",
    category: "Arts & Design",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnaolFzRDVvnfjpe4bR2Y690UV98sAF_mImEDr2xPDZCWYpgR0IJrQqqC9d1DCXImv5HVV03Wsbd3M-nOOTCvXuyFt_JS3HfOovsWHUn2-DQoGJCR106iO9t8Gv_ZwGo3qf75kag1cF0PXFBJ7a8tvpz8mxpbpxaLa4ihyn6tK-CNejDn0-dK9pt8900_0NiKT97ZKt6g71h-FIdjHPAH56uw0pIYrZhgbYKLRLI3yDpDQSQv-xtfIqN7AMeowPtwYvBQmkS_Xdd8",
    likes: "1.1k",
    badgeType: "primary" as const,
    href: "#",
  },
  {
    id: 6,
    title: "One Asia Festival: A Fan's Diary",
    description: "Experiencing Korea's largest Hallyu festival through the eyes of a first-time attendee from the UK.",
    date: "October 02, 2024",
    category: "Events",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5yvG7ZaF8HyOoDErqpKVkxuHrj3tptFqTk6SHJ6EsIWAL27ewNdt-hGEIwqtA-LFF4u92kptS4mez2bjHz15a23it-vNcAruAc3qPx3A52q08Z1RDkKW0BLt8eX_50C-Z1aKQUnvaFurSI-U36vxoKoXhsV_cUpb3eYa9oR3Gk_T9GQKTvoHHDwd07f32v2fbsKHH-6QLzj1gV45pF0LZUHgK31xnewy_xzHS7hE90Qkfu-Vq0ODN7PhJ-A_Ca9-t3jbz5v7zzFQ",
    likes: "3.2k",
    badgeType: "secondary" as const,
    href: "#",
  }
];

export default function BlogPage() {
  const totalPages = 10; // For demonstration purposes

  return (
    <div className="pt-32 pb-section-gap">
      <BlogHero />
      <section className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-8">
          {mockPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </section>
      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} basePath="/blog" />
      </Suspense>
    </div>
  );
}
