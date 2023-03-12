import { useState, useEffect } from "react";
import {
  getRandomWords,
  getNextWord,
  saveAnswer,
  getStatistics,
} from "./utils";
import { getTestWordList } from "../../lib/api/dict";

const MAX_WORDS_PER_LEVEL = 100; // 每个等级最多的单词数量
const MAX_LEVEL = 4; // 最大等级

function useLevelHook() {
  const [level, setLevel] = useState(0); // 当前测试等级
  const [wordList, setWordList] = useState([]); // 当前等级中抽取出的待测试单词列表
  const [history, setHistory] = useState([]); // 用户的答题历史记录
  const [statistic, setStatistic] = useState({}); // 当前预估词汇量及预估误差值
  const [currentWord, setCurrentWord] = useState(null); // 当前测试单词
  const [isLoading, setIsLoading] = useState(false); // 是否正在加载单词列表
  const [isTestComplete, setIsTestComplete] = useState(false); // 测试是否完成

  // 获取当前测试等级的单词列表
  useEffect(() => {
    console.log("level", level);
    const fetchWordList = async () => {
      setIsLoading(true);
      const newWordList = await getTestWordList(level);
      if (newWordList) {
        const _wordList = getRandomWords(newWordList, MAX_WORDS_PER_LEVEL);
        setWordList(_wordList);
        setCurrentWord(getNextWord(_wordList));
      } else {
        // 找不到单词列表，怎么处理？
        setWordList([]);
        setCurrentWord(null);
      }
      setIsLoading(false);
    };
    fetchWordList();
  }, [level]);

  // 保存用户的答题结果并更新历史记录、词频信息和预测信息
  const onSubmitAnswer = async (selectedOption) => {
    const answer = {
      word: currentWord,
      level,
      selectedOption: selectedOption,
      correctOption: currentWord.translation,
      isCorrect: selectedOption === currentWord.translation,
    };
    const newHistory = [...history, answer];
    const newStats = getStatistics(newHistory);
    console.log("submit:", newStats);

    setIsLoading(true);
    await saveAnswer(answer, newHistory, level);
    setHistory(newHistory);
    setStatistic(newStats);
    setIsLoading(false);

    // 如果当前level已经回答超过3题并且正确率>70%，晋升level
    const levelStat = newStats.levels[level];
    if (levelStat.questions >= 3 && levelStat.accuracy >= 0.7) {
      if (level < MAX_LEVEL) {
        setLevel(level + 1);
        return;
      }
    }

    // 如果当前level已经回答超过3题并且正确率<30%，降低level
    if (levelStat.questions >= 3 && levelStat.accuracy <= 0.3) {
      if (level > 1) {
        setLevel(level - 1);
        return;
      }
    }

    const nextWord = getNextWord(wordList, currentWord, answer.isCorrect);
    if (nextWord) {
      setCurrentWord(nextWord);
      return;
    }
    if (answer.isCorrect) {
      // 下一个level
      if (level < MAX_LEVEL) {
        setLevel(level + 1);
        return;
      }
    } else {
      // 降一个level
      if (level > 1) {
        setLevel(level - 1);
        return;
      }
    }
    // 完成测试
    setCurrentWord(null);
    setIsTestComplete(true);
  };

  const onFinish = () => {
    setIsTestComplete(true);
  }

  return {
    level,
    currentWord,
    wordList,
    history,
    statistic,
    onSubmitAnswer,
    isLoading,
    isTestComplete,
    onFinish,
  };
}

export default useLevelHook;
