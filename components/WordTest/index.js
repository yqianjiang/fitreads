import { Container, Box, Typography } from "@mui/material";
import { Button, Stack } from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import AnswerForm from "./AnswerForm";
import ProgressBar from "./ProgressBar";
import TestResult from "./TestResult";
import useLevelHook from "./useLevelHook";

const MIN_TEST_NUM = 17;

function WordTest() {
  const {
    level,
    currentWord,
    history,
    onSubmitAnswer,
    statistic,
    isLoading,
    isTestComplete,
    speakCurrentWord,
    onFinish,
  } = useLevelHook();

  const handleSubmit = (selectedOption) => {
    onSubmitAnswer(selectedOption);
  };

  const handleFinish = () => {
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
        <ProgressBar minTestCount={MIN_TEST_NUM} history={history} />
        <TestResult statistics={statistic} showDetail={false} level={level} />
        {currentWord && (
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h3" component="h2" gutterBottom>
              {`${currentWord.word}`}
            </Typography>
            <Stack direction={"row"} sx={{ height: "20px", ml: 1 }}>
              <Button onClick={speakCurrentWord}>
                英音
                <VolumeUp />
              </Button>
              <Button onClick={() => speakCurrentWord(144)}>
                美音
                <VolumeUp />
              </Button>
            </Stack>
          </Stack>
        )}
        {currentWord && (
          <AnswerForm
            options={currentWord.options}
            onSubmit={handleSubmit}
            showFinish={history.length >= MIN_TEST_NUM}
            onFinish={handleFinish}
          />
        )}
      </Box>
    </Container>
  );
}

export default WordTest;
