export function getRandomWords(words, count) {
  words = words.filter((word) => word.frequency);
  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getNextWord(wordList, curr, isCorrect) {
  let selectedList;
  if (curr) {
    // 把当前单词从wordList中移除
    const idx = wordList.findIndex((word) => word.word === curr.word);
    wordList.splice(idx, 1);
    // frequency值越大，表示单词越不常见（越难）
    if (isCorrect) {
      selectedList = wordList.filter((word) => word.frequency > curr.frequency);
    } else {
      selectedList = wordList.filter((word) => word.frequency < curr.frequency);
    }
  } else {
    // 第一个选frequency排中间的？
    const sortedList = wordList.sort(
      (word1, word2) => word1.frequency - word2.frequency
    );
    return sortedList[Math.floor(sortedList.length / 2)];
  }
  if (selectedList.length) {
    return getRandomWords(selectedList, 1)[0];
  } else {
    return null;
  }
}

export function saveAnswer(answer, history, level) {
  const score = answer.isCorrect ? 1 : 0;
  const correctAnswers = history.filter((answer) => answer.isCorrect).length;
  const totalAnswers = history.length;

  // Save score and correct answer rate for current level to localStorage
  const levelScore = Number(localStorage.getItem(`level${level}Score`)) || 0;
  const levelCorrectAnswers =
    Number(localStorage.getItem(`level${level}CorrectAnswers`)) || 0;
  const levelTotalAnswers =
    Number(localStorage.getItem(`level${level}TotalAnswers`)) || 0;
  localStorage.setItem(`level${level}Score`, levelScore + score);
  localStorage.setItem(
    `level${level}CorrectAnswers`,
    levelCorrectAnswers + correctAnswers
  );
  localStorage.setItem(
    `level${level}TotalAnswers`,
    levelTotalAnswers + totalAnswers
  );

  // Save answer history to localStorage
  const savedHistory = JSON.parse(localStorage.getItem("answerHistory")) || {};
  const wordHistory = savedHistory[answer.word] || {
    frequency: answer.word.frequency,
    answers: [],
  };
  wordHistory.answers.push({
    selectedOption: answer.selectedOption,
    correctOption: answer.correctOption,
    isCorrect: answer.isCorrect,
  });
  savedHistory[answer.word] = wordHistory;
  localStorage.setItem("answerHistory", JSON.stringify(savedHistory));
}

export function getStatistics(history) {
  const stats = {};
  const levels = {};
  let totalScore = 0;
  let totalQuestions = 0;
  let totalCorrect = 0;
  let estimatedVocabulary = 0;
  let estimatedError = 0;
  let totalFrq = 0;

  history.forEach((answer) => {
    const level = answer.level;
    const score = answer.isCorrect ? 1 : 0;
    totalScore += score;
    totalQuestions += 1;
    totalCorrect += answer.isCorrect ? 1 : 0;
    levels[level] = levels[level] || { score: 0, questions: 0, correct: 0, totalFrq: 0 };
    levels[level].score += score;
    levels[level].questions += 1;
    levels[level].correct += answer.isCorrect ? 1 : 0;
    levels[level].totalFrq += answer.word.frequency;
    totalFrq += answer.word.frequency;
  });

  stats.totalScore = totalScore;
  stats.totalQuestions = totalQuestions;
  stats.totalCorrect = totalCorrect;
  stats.levels = Object.keys(levels).map((level) => {
    const { score, questions, correct, totalFrq } = levels[level];
    return {
      level: parseInt(level),
      score,
      questions,
      correct,
      frq: totalFrq / questions,
      accuracy: questions ? correct / questions : 0,
    };
  });

  // Calculate estimated vocabulary
  stats.levels.forEach((level) => {
    estimatedVocabulary +=
      level.accuracy * [600, 968, 1385, 2798, 7623][level.level];
  });

  // Calculate estimated error (算法待完善，怎么计算比较合理？)
  // 当level覆盖还较少且全部答对时，预测是低估的
  // 当存在蒙的情况，每蒙一个就有1/4的机会蒙对，使得误差偏高
  // 当答题数还比较少时，可能因随机性带来误差
  const errorBase = 1 / Math.pow(Math.log10(totalQuestions + 10), 1.3);
  let errorCount = 0;
  let wrongCount = 0;
  history.forEach((answer) => {
    if (!answer.isCorrect) {
      wrongCount += 1;
      if (answer.selectedOption !== "不认识") {
        errorCount += 1;
      }
    }
  });
  estimatedError =
    wrongCount === 0
      ? errorBase
      : (errorCount / wrongCount) * 0.5 + 0.5 * errorBase > 1
      ? 1
      : (errorCount / wrongCount) * 0.5 + 0.5 * errorBase;

  stats.estimatedVocabulary = Math.round(estimatedVocabulary);
  stats.estimatedError = estimatedError;

  console.log('总平均frq: ', totalFrq / totalQuestions)
  console.log('基于总平均frq的estimatedVocabulary: ', totalFrq / totalQuestions * (totalCorrect / totalQuestions) )
  const lastLevel = stats.levels[stats.levels.length - 1];
  console.log('基于总当前level的frq的estimatedVocabulary: ',lastLevel.frq * (lastLevel.accuracy));

  return stats;
}
