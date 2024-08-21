/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.REACT_APP_BASE_URL,
  },
  output: 'export',
  assetPrefix: 'https://AndriyBats.github.io/Car-dealer/',
};

export default nextConfig;
