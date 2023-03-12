import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";
import StartGuide from "../components/StartGuide";
import { useState } from "react";


export default function Home() {
  const [open, setOpen] = useState(false);

  const handleStart = () => {
    setOpen(true);
  };

  const onClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  return (
    <Layout>
      <section>
        <Typography variant="h3" component="h1" gutterBottom>
          FitReads 给您量身定制的阅读体验
        </Typography>
        <Typography variant="body1" gutterBottom>
          FitReads: Customized Reading Experience Tailored Just for You
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom>
          欢迎使用FitReads！您想通过阅读自己感兴趣的材料提高英语水平，却因为难度太高而无从下手？
          FitReads可以通过记录您的个人词汇量和学习目标，帮助您判断阅读材料的适宜程度，并在阅读过程中将重要的生词高亮显示，帮助您更有效地学习！
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome! Are you tired of struggling to improve your English through
          reading materials that are too challenging? FitReads can help! We keep
          track of your personal vocabulary and learning goals, so you can
          determine if the material is appropriate for you, and even highlight
          important new words for you as you read.
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom>
          马上选择一篇您感兴趣的文章，体验一下吧！
        </Typography>
        <Typography variant="body1" gutterBottom>
          Find a topic that interests you and start using FitReads today!
          Enhance your reading experience and improve your English skills
          effortlessly.
        </Typography>
        <Button
          variant="contained"
          onClick={handleStart}
        >
          开始体验！
        </Button>
        <StartGuide open={open} onClose={onClose} />
      </section>
    </Layout>
  );
}
