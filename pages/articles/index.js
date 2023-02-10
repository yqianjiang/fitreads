import Layout from "../../components/Layout";
import utilStyles from "../../styles/utils.module.css"; // using module css with scoped
import { getSortedPostsData } from "../../lib/api/articles";
import Link from "next/link";
import Date from "../../components/Date";
import { useEffect, useState } from "react";

export default function Articles() {
  const [allPostsData, setAllPostsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getSortedPostsData();
      setAllPostsData(res);
    }
    fetchData();
  }, []);

  return (
    <Layout pageName={"文章列表"}>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>文章列表</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, lastModified, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`articles/${id}`}>{title || id}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={lastModified} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
