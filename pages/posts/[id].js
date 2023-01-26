import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { useEffect, useState } from "react";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getPostData(id);
      setPostData(res);
    }
    fetchData();
  }, [id]);

  return (
    <Layout pageName={postData?.title || ""}>
      <article>
        <h1 className={utilStyles.headingXl}>{postData?.title || ""}</h1>
        <div className={utilStyles.lightText}>
          {postData ? <Date dateString={postData.date} /> : ""}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: postData?.contentHtml || "" }}
        />
      </article>
    </Layout>
  );
}
