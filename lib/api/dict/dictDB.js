import { db } from "../../vendors/db.js";

async function getTranslationBatchLocal(params) {
  const res = {};
  for (const word of params.words) {
    const trans = await getTranslationLocal(word, params.onlyTranslation);
    if (trans) {
      res[word] = trans;
    }
  }
  return res;
}

async function getTranslationLocal(word, onlyTranslation) {
  const res = await db.dict.get(word);
  return res;
}

async function saveTranslationBatch(wordDict) {
  let count = 0;
  for (const word in wordDict) {
    try {
      const id = await db.dict.add(wordDict[word]);
      count++;
    } catch (error) {
      console.log(error);
    }
  }
  console.log("已保存", count);
}

export { getTranslationBatchLocal, getTranslationLocal, saveTranslationBatch };
