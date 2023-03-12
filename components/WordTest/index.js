import { Container, Box, Typography } from "@mui/material";
import AnswerForm from "./AnswerForm";
import ProgressBar from "./ProgressBar";
import TestResult from "./TestResult";
import useLevelHook from "./useLevelHook";

function WordTest() {
  const {
    level,
    currentWord,
    history,
    onSubmitAnswer,
    statistic,
    isLoading,
    isTestComplete,
    onFinish,
  } = useLevelHook();

  const handleSubmit = (selectedOption) => {
    onSubmitAnswer(selectedOption);
  };

  const handleFinish = (selectedOption) => {
    onSubmitAnswer(selectedOption);
    onFinish();
  };

  if (isLoading) {
    return <div>Loading...</div>; // 展示加载中的UI
  }

  if (isTestComplete) {
    return <TestResult statistics={statistic} showDetail={true} />; // 展示测试完成的UI
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <ProgressBar minTestCount={15} history={history} />
        <TestResult statistics={statistic} showDetail={false} />
        {currentWord && (
          <Typography variant="h6" component="h2" gutterBottom>
            {`Please translate: ${currentWord.word}`}
          </Typography>
        )}
        {currentWord && (
          <AnswerForm options={currentWord.options} onSubmit={handleSubmit} showFinish={false} onFinish={handleFinish} />
        )}
      </Box>
    </Container>
  );
}

export default WordTest;
