// A top-level React component that wraps all the pages
// Can load global CSS, & keep global states
// https://nextjs.org/docs/advanced-features/custom-app
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
