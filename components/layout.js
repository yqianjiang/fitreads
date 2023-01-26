import Head from 'next/head'
// import Image from 'next/image'
import styles from './layout.module.scss'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export const siteTitle = '您的定制词典'

export default function Layout({ children, pageName }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{pageName+' | '+siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <div className={styles.backToHome}>
          <Link href="/">Home</Link>
          <span> | </span>
          <Link href="/posts">Posts</Link>
        </div>
      </header>
      <main>{children}</main>
      {/* footer */}
    </div>
  )
}
