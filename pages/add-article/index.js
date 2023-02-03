import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import ArticleAdder from "../../components/ArticleAdder";
import ArticleDisplay from "../../components/ArticleDisplay";
import { preprocessing } from "../../lib/article/preprocessing";
import { realtimeAnalyzer } from "../../lib/article/realtimeAnalyzer";
import { useState } from "react";
import { Box, Button } from "@mui/material";

export default function AddArticle() {
  const [articleProps, setArticleProps] = useState(null);
  const [data, setData] = useState(null);
  const vocabulary = useSelector((state) => state.vocabulary);
  const handleSaveClick = () => {
    console.log("handleSaveClick");
  };
  const handleBackClick = () => {
    console.log("handleBackClick");
  };
  const handleAnalyzeClick = (content) => {
    // const processedArticle = preprocessing(content);
    const { data, articleInfo } = realtimeAnalyzer(content, vocabulary);
    setArticleProps(articleInfo);
    setData(data);
  };
  return (
    <Layout pageName={"新增文章"}>
      {articleProps ? (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              marginTop: "1rem",
            }}
          >
            <Button onClick={handleSaveClick}>保存</Button>
            <Button onClick={handleBackClick}>返回</Button>
          </Box>
          <ArticleDisplay initialData={data} {...articleProps} />
        </>
      ) : (
        <ArticleAdder {...{ handleAnalyzeClick }} />
      )}
    </Layout>
  );
}
