import { useState } from "react";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "../../components/Alert";
import Layout from "../../components/Layout";
import ArticleAdder from "../../components/ArticleAdder";
import ArticleDisplay from "../../components/ArticleDisplay";
import { preprocessing } from "../../lib/article/preprocessing";
import { realtimeAnalyzer } from "../../lib/article/realtimeAnalyzer";
import { saveArticleData } from "../../lib/api/articles";

// 用于保存的数据，不需要向用户展示
let processedArticle;

export default function AddArticle() {
  const [data, setData] = useState(null);
  const [articleProps, setArticleProps] = useState(null);
  const vocabulary = useSelector((state) => state.vocabulary);

  const handleAnalyzeClick = (content) => {
    processedArticle = preprocessing(content);
    const { data, articleInfo } = realtimeAnalyzer(content, vocabulary);
    setArticleProps({ ...processedArticle, ...articleInfo });
    setData(data);
  };

  const [message, setMessage] = useState({ duration: 6000 });

  const handleSaveClick = async () => {
    await saveArticleData(processedArticle);
    setMessage({
      ...message,
      content: "保存成功，可在本地文章列表查看",
      type: "success",
    });
  };

  const onEditArticle = ({ title, category }) => {
    processedArticle.title = title;
    processedArticle.category = category;
    setArticleProps({ ...articleProps, title, category });
  };

  const handleBackClick = () => {
    setArticleProps(null);
  };

  return (
    <Layout pageName={"新增文章"}>
      <ArticleAdder handleAnalyzeClick={handleAnalyzeClick} />
      {articleProps && (
        <>
          <Divider />
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              marginTop: "1rem",
            }}
          >
            {/* <Button onClick={handleBackClick}>返回</Button> */}
            <Button variant="contained" onClick={handleSaveClick}>
              保存
            </Button>
            <Alert message={message} />
          </Box>
          <ArticleDisplay
            initialData={data}
            onEditArticle={onEditArticle}
            {...articleProps}
          />
        </>
      )}
    </Layout>
  );
}
