import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Layout from "../../components/Layout";
import ArticleDisplay from "../../components/ArticleDisplay";
import Link from "../../components/Link";

import { realtimeAnalyzer } from "../../lib/article/realtimeAnalyzer";
import { getArticleData, updateArticle } from "../../lib/api/articles";


export default function Article() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [articleProps, setArticleProps] = useState(null);
  const vocabulary = useSelector((state) => state.vocabulary);

  const onEditArticle = (changes) => {
    updateArticle(id, changes);
    setArticleProps({ ...articleProps, ...changes });
  };

  useEffect(() => {
    async function fetchData() {
      const post = await getArticleData(id);
      if (post) {
        const { data, articleInfo } = realtimeAnalyzer(
          post.content,
          vocabulary
        );
        setArticleProps({ ...post, ...articleInfo });
        setData(data);
      }
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Layout pageName={articleProps?.title || ""}>
      <Link sx={{mb: 1, display: 'block'}} underline="hover" href={`/articles/`}>返回文章列表</Link>
      {articleProps ? (
        <ArticleDisplay
          initialData={data}
          onEditArticle={onEditArticle}
          {...articleProps}
        />
      ) : (
        <p>找不到文章信息...</p>
      )}
    </Layout>
  );
}
