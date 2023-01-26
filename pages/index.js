import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'  // using module css with scoped
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { useEffect, useState } from 'react'

export default function Home() {
  const [allPostsData, setAllPostsData] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await getSortedPostsData()
      setAllPostsData(res)
    }
    fetchData()
  }, [])
  return (
    <Layout pageName={'首页'}>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}