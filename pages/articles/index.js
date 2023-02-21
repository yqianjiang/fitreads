import { useEffect, useState } from "react";
import { getSortedArticlesData, delArticle } from "../../lib/api/articles";

import Layout from "../../components/Layout";
import ArticleList from "../../components/ArticleList";

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
      <h2>文章列表</h2>
      {/* 路由获取类别参数，All, tag1, tag2 */}
      <ArticleList articlesDict={allArticlesData} />
      {/* 应该加个确认; 改成actions  */}
      {/* <ListItemButton
            onClick={async () => {
              await delArticle(id);
              fetchData();
            }}
          >
            删除
          </ListItemButton> */}
    </Layout>
  );
}
