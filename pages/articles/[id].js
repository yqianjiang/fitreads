import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ArticleDisplay from "../../components/ArticleDisplay";
import { realtimeAnalyzer } from "../../lib/article/realtimeAnalyzer";
import { getPostData } from "../../lib/api/posts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [articleProps, setArticleProps] = useState(null);
  const vocabulary = useSelector((state) => state.vocabulary);

  useEffect(() => {
    async function fetchData() {
      const post = await getPostData(id);
      if (post) {
        const { data, articleInfo } = realtimeAnalyzer(post.content, vocabulary);
        setArticleProps({...post, ...articleInfo});
        setData(data);
      }
    }
    fetchData();
  }, [id]);

  return (
    <Layout pageName={articleProps?.title || ""}>
      {articleProps ? <ArticleDisplay initialData={data} {...articleProps} /> : ""}
    </Layout>
  );
}
