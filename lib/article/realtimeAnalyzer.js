import {tokenize} from './tokenize.js'
import {findLemma} from '../lemmatize.js'

/**
 * 实时分析文章模块：根据用户当前的词表来分析其对文章的掌握程度
 * @param {string} content
 * @param {object} userDict
 */
export function realtimeAnalyzer(content, userDict) {
  // 从content得到wordsUnique
  const articleInfo = analyzeContent(content);

  // 对比wordsUnique和userDict
  const data = analyzeWords(articleInfo.wordsUnique, userDict);

  return { data, articleInfo };
}

// 对文章进行tokenize，从中获取一些基本信息
function analyzeContent(content) {
  const {
    title,
    // markedTokenText,
    totalWords,
    wordsUnique,
    sentences
  } = tokenize(content);

  return {
    title,
    totalWords,
    wordsUnique,
    sentences
  };
}

/**
 * 对比wordsUnique和userDict，分析当前文章中的生词、熟词、目标词
 * @param {string[]} wordsUnique
 * @param {object} userDict
 * @returns
 */
function analyzeWords(wordsUnique, userDict) {
  const data = {};
  const { familiarWord, newWord, unseen } = compare(
    wordsUnique,
    userDict.familiarWords,
    userDict.newWords
  );
  data.newWord = newWord;
  data.unseenWord = unseen;
  data.familiarWord = familiarWord;
  data.targetWord = wordsUnique.filter((w) => w in userDict.targetWords);
  return data;
}

/**
 * 对比words中有多少已知、多少未知、多少没见过
 * @param {string[]} words
 * @param {object} familiarWordsHashMap
 * @param {object} newWordsHashMap
 * @returns {{newWord: string[]; unseen: string[]; familiarWord: string[]}}
 */
function compare(words, familiarWordsHashMap, newWordsHashMap) {
  const familiarWord = [];
  const newWord = [];
  const unseen = [];

  for (let word of words) {
    word = findLemma(word);
    if (word in newWordsHashMap) {
      newWord.push(word);
    } else if (word in familiarWordsHashMap) {
      familiarWord.push(word);
    } else {
      unseen.push(word);
    }
  }

  return {
    familiarWord,
    newWord,
    unseen,
  };
}
