// next.config.js
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  basePath: isProd ? '/tridict-reading' : '',
  images: {
    unoptimized: true,
  },
}