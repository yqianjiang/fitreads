import { useState } from "react";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import LoadingButton from '@mui/lab/LoadingButton';
import Button from "@mui/material/Button";
import Alert from "../../components/Alert";
import Layout from "../../components/Layout";
import ArticleAdder from "../../components/ArticleAdder";
import ArticleDisplay from "../../components/ArticleDisplay";
import { preprocessing } from "../../lib/article/preprocessing";
import { realtimeAnalyzer } from "../../lib/article/realtimeAnalyzer";
import { saveArticleData, fetchExampleArticle } from "../../lib/api/articles";

// 用于保存的数据，不需要向用户展示
let processedArticle;

export default function AddArticle() {
  const [data, setData] = useState(null);
  const [articleProps, setArticleProps] = useState(null);
  const [loading, setLoading] = useState(false);
  const vocabulary = useSelector((state) => state.vocabulary);

  const analyzeContent = (content, meta) => {
    processedArticle = preprocessing(content, meta);
    const { data, articleInfo } = realtimeAnalyzer(content, vocabulary);
    setArticleProps({ ...processedArticle, ...articleInfo });
    setData(data);
  };

  const handleImportExample = async () => {
    setLoading(true);
    const article = await fetchExampleArticle();
    if (article) {
      analyzeContent(article.content, {title: article.title, category: article.tag})
    }
    setLoading(false);
  }
  
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
      <LoadingButton variant="contained" onClick={handleImportExample} loading={loading}>导入示例文章</LoadingButton>
      <ArticleAdder handleAnalyzeClick={analyzeContent} />
      {articleProps && (
        <>
          <Divider />
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              mb: 1,
              mt: 2,
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
