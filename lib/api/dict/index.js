// import { getTranslationBatchLC, getTranslationLC } from "./dictLC";
import {
  getTranslationBatchLocal,
  getTranslationLocal,
  saveTranslationBatch,
} from "./dictDB";
import { BASE_URL } from "../constants";

export async function fetchTranslation(word, onlyTranslation) {
  // 先从db找
  const meaning = await getTranslationLocal(word, onlyTranslation);
  if (meaning) {
    return meaning;
  }
  // db没有就在线找
  // const res = await getTranslationLC(word, onlyTranslation);
  // return res;
}

export async function fetchTranslationBatch(params) {
  // 先从db找
  await saveTranslationBatch();
  const words = await getTranslationBatchLocal(params);

  let resWords = params.words.filter((x) => !words[x]);
  console.log("需要查询", params.words.length);
  console.log("从本地加载", Object.keys(words).length);
  console.log("还需要下载", resWords.length);
  if (!resWords.length) return words;

  // db没有的就在线找, 把resWords分batch找
  // const nBatches = Math.ceil(resWords.length / 100);

  // for (let i = 0; i < nBatches; i++) {
  //   const res = await getTranslationBatchLC({
  //     ...params,
  //     words: resWords.slice(i * 100, (i + 1) * 100 - 1),
  //   });

  //   saveTranslationBatch(res);
  //   Object.assign(words, res);
  // }
  // console.log("有翻译的词汇", Object.keys(words).length);
  return words;
}

export async function downloadDictionary({ dictionary }) {
  try {
    const res = await fetch(`${BASE_URL}/words/${dictionary}.json`);
    const words = await res.json();

    const wordsDict = {};
    // format words
    for (const wordInfo of words) {
      const { vc_vocabulary: word, ...rest } = wordInfo;
      wordsDict[word] = {
        word,
        dictionary,
        ...rest,
      };
    }

    saveTranslationBatch(wordsDict);
    return words.map((x) => x.vc_vocabulary);
  } catch (e) {
    console.log(e);
  }
}

export async function downloadCommonDictionary() {
  try {
    const res = await fetch(`${BASE_URL}/words/ecdict2w.json`);
    const words = await res.json();

    const wordsDict = {};
    // format words
    for (const wordInfo of words) {
      wordsDict[wordInfo['word']] = wordInfo;
    }

    saveTranslationBatch(wordsDict);
  } catch (e) {
    console.log(e);
  }
}

const levelMap = ['5', '4', '3', '2', '1']
export async function getTestWordList(level) {
  try {
    const res = await fetch(`${BASE_URL}/testWords/ecdictCollins${levelMap[level]}.json`);
    const words = await res.json();
    return words || [];
  } catch (e) {
    console.log(e);
  }
}
