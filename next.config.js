/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["*"],
  },
};

// module.exports =nextConfig ;
const removeImports = require("next-remove-imports")();
module.exports = removeImports({ nextConfig });
