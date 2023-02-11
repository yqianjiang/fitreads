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
  try {
    await db.dict.bulkAdd(Object.values(wordDict));
  } catch (error) {
    console.log(error);
  }
}

export { getTranslationBatchLocal, getTranslationLocal, saveTranslationBatch };
