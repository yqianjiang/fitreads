import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";
import utilStyles from "../styles/utils.module.css"; // using module css with scoped
import { NextLinkComposed } from "../components/Link";

export default function Home() {
  return (
    <Layout pageName={"首页"}>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Typography variant="h2" component="h1" gutterBottom>
          FitReads 给您量身定制的阅读体验
        </Typography>
        <Typography variant="body1" gutterBottom>
          欢迎！想要通过阅读感兴趣的材料提高您的英语水平，却苦于材料太难？FitReads可以通过记录您个人的词汇量、词汇学习目标，帮助您判断材料是否合适，并在您阅读时把对您个人的重要生词高亮出来！
        </Typography>
        <Typography variant="body1" gutterBottom>
          请找一篇您感兴趣的文章，马上试用一下吧！
        </Typography>
        <Button
          variant="contained"
          component={NextLinkComposed}
          to={{
            pathname: "add-article/",
          }}
        >
          开始分析！
        </Button>
      </section>
    </Layout>
  );
}
