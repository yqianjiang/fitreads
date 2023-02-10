import { useState } from "react";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Layout from "../../components/Layout";
import ArticleAdder from "../../components/ArticleAdder";
import ArticleDisplay from "../../components/ArticleDisplay";
import { preprocessing } from "../../lib/article/preprocessing";
import { realtimeAnalyzer } from "../../lib/article/realtimeAnalyzer";
import { savePostData } from "../../lib/api/articles";

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

  const handleSaveClick = async () => {
    await savePostData(processedArticle);
    // 保存成功后，给用户反馈：保存成功，可在本地文章列表查看
    setOpen(true);
    setMessage({
      ...message,
      content: "保存成功，可在本地文章列表查看",
      type: "success",
      duration: 6000,
    });
  };

  const handleBackClick = () => {
    setArticleProps(null);
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
    content: "",
    type: "success",
    duration: 6000,
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Layout pageName={"新增文章"}>
      <ArticleAdder
        handleAnalyzeClick={handleAnalyzeClick}
      />
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
            <Button variant="contained" onClick={handleSaveClick}>保存</Button>
          </Box>
          <Snackbar
            open={open}
            autoHideDuration={message.duration}
            onClose={handleCloseSnackbar}
          >
            <Alert severity={message.type}>{message.content}</Alert>
          </Snackbar>
          <ArticleDisplay initialData={data} {...articleProps} />
        </>
      )}
    </Layout>
  );
}
