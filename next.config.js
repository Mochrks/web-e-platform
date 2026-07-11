/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification (faster builds)
  swcMinify: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Compress responses
  compress: true,

  // Disable source maps in production
  productionBrowserSourceMaps: false,

  // Strict mode for catching issues
  reactStrictMode: true,

  // Tree-shake lucide-react icons for smaller bundles
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
};

module.exports = nextConfig;
