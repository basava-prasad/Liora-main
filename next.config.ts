import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // 90 is used by the hero's desktop background, 82 by its mobile crops.
    qualities: [75, 82, 90],
  },
}

export default nextConfig
