// next.config.js
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  basePath: isProd ? '/fitreads' : '',
  assetPrefix: isProd ? '/fitreads' : '',
  output: 'standalone',
}