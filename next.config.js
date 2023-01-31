// next.config.js
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  basePath: isProd ? '/tridict-reading' : '',
  assetPrefix: isProd ? '/tridict-reading' : '',
  images: {
    loader: 'akamai',
    path: '',
  },
}