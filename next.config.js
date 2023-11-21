/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // SERVER_URL: 'https://forum-back.onrender.com'
    SERVER_URL: 'http://localhost:8080'
  },
}

module.exports = nextConfig
