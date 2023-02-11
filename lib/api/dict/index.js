import { getTranslationBatchLC, getTranslationLC } from "./dictLC";
import {
  getTranslationBatchLocal,
  getTranslationLocal,
  saveTranslationBatch,
} from "./dictDB";

export async function fetchTranslation(word, onlyTranslation) {
  // 先从db找
  const meaning = await getTranslationLocal(word, onlyTranslation);
  if (meaning) {
    return meaning;
  }
  // db没有就在线找
  const res = await getTranslationLC(word, onlyTranslation);
  return res;
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
  const nBatches = Math.ceil(resWords.length / 100);

  for (let i = 0; i < nBatches; i++) {
    const res = await getTranslationBatchLC({
      ...params,
      words: resWords.slice(i * 100, (i + 1) * 100 - 1),
    });

    saveTranslationBatch(res);
    Object.assign(words, res);
  }
  console.log("有翻译的词汇", Object.keys(words).length);
  return words;
}
