import Layout from "../../components/Layout";
import utilStyles from "../../styles/utils.module.css"; // using module css with scoped
import { getSortedArticlesData, delArticle } from "../../lib/api/articles";
import Link from "next/link";
import Date from "../../components/Date";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

export default function Articles() {
  const [allArticlesData, setAllArticlesData] = useState([]);

  async function fetchData() {
    const res = await getSortedArticlesData();
    setAllArticlesData(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout pageName={"文章列表"}>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>文章列表</h2>
        <ul className={utilStyles.list}>
          {allArticlesData.map(({ id, lastModified, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`articles/${id}`}>{title || id}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={lastModified} />
              </small>
              <Button
                onClick={async () => {
                  await delArticle(id);
                  fetchData();
                }}
              >
                删除
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
