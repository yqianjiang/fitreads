import { useEffect, useState } from "react";
import utilStyles from "../../styles/utils.module.css"; // using module css with scoped
import { getSortedArticlesData, delArticle } from "../../lib/api/articles";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";

import Layout from "../../components/Layout";
import Link from "../../components/Link";
import Date from "../../components/Date";
import WordsManager from "../../components/words/WordsManager";

export default function Articles() {
  const [allArticlesData, setAllArticlesData] = useState([]);

  async function fetchData() {
    const res = await getSortedArticlesData();
    setAllArticlesData(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  return (
    <Layout pageName={"文章列表"}>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>文章列表</h2>
        <ul className={utilStyles.list}>
          {allArticlesData.map(({ id, lastModified, title, wordsUnique }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link underline="hover" href={`/articles/${id}`}>{title || id}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={lastModified} />
              </small>
              {wordsUnique && (
                <>
                  <Button onClick={toggleDrawer(true)} sx={{ ml: 1 }}>
                    查看词表
                  </Button>
                  <Drawer
                    anchor={"bottom"}
                    open={drawerState}
                    onClose={toggleDrawer(false)}
                  >
                    <Paper sx={{ height: 400 }}>
                      <WordsManager wordsFilter={wordsUnique} fixed={true} />
                    </Paper>
                  </Drawer>
                </>
              )}
              {/* 应该加个确认 */}
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
