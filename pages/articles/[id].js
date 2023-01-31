import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ArticleDisplay from "../../components/ArticleDisplay";
import { realtimeAnalyzer } from "../../lib/article/realtimeAnalyzer";
import { getPostData } from "../../lib/posts";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [articleProps, setArticleProps] = useState(null);
  const userDict = useSelector((state) => state.vocabulary);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const res = await getPostData(id);
      const { data } = realtimeAnalyzer(res.content, userDict);
      res.data = data;
      setArticleProps(res);
    }
    fetchData();
  }, [id]);

  return (
    <Layout pageName={articleProps?.title || ""}>
      {articleProps ? <ArticleDisplay {...articleProps} /> : ""}
    </Layout>
  );
}
