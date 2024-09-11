/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.REACT_APP_BASE_URL,
  },
  output: 'export',
  basePath: '/Car-dealer',
};

export default nextConfig;
