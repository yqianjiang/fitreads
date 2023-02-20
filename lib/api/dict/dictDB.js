import { db } from "../../vendors/db.js";

function format(_meaning) {
  for (const key in _meaning) {
    if (typeof _meaning[key] === "string") {
      _meaning[key] = _meaning[key].replaceAll("\\n", "\n");
    }
  }
  return _meaning;
}

async function getTranslationBatchLocal(params) {
  const res = {};
  for (const word of params.words) {
    const trans = await getTranslationLocal(word, params.onlyTranslation);
    if (trans) {
      res[word] = format(trans);
    }
  }
  return res;
}

async function getTranslationLocal(word, onlyTranslation) {
  const res = await db.dict.get(word);
  return format(res);
}

async function saveTranslationBatch(wordDict) {
  try {
    const arr = Object.values(wordDict);
    // 批量添加
    await db.dict.bulkAdd(arr).catch("BulkError", (err) => {
      for (const [pos, error] of Object.entries(err.failuresByPos)) {
        // 添加失败的单词，更新
        db.dict.update(arr[pos]["word"], arr[pos]).then(function (updated) {
          if (!updated) console.log(`Operation ${pos} failed with ${error}`);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export { getTranslationBatchLocal, getTranslationLocal, saveTranslationBatch };
