import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/utils/supabaseImageLoader.ts",
  },
};

export default nextConfig;
