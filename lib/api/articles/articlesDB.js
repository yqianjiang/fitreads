import { db } from "../../vendors/db.js";

async function getArticleBatchLocal({
  category = "",
  batchSize = 10,
  startIdx = 0,
  orderBy = "createdAtDescending",
}) {
  const sortByMaps = {
    createdAtDescending: "lastModified",
  };

  let query = db.articles;

  if (category) {
    query = query.where("category").equals(category);
  }

  const res = await query
    .limit(batchSize)
    .offset(startIdx)
    .sortBy(sortByMaps[orderBy]);

  return res;
}

async function getArticleLocal(id) {
  const res = await db.articles.get(id);
  return res;
}

// 保存多篇文章
async function saveArticleBatchLocal(articleDict) {
  try {
    await db.articles.bulkAdd(
      Object.values(articleDict),
      Object.keys(articleDict)
    );
    console.log("保存成功！");
  } catch (error) {
    console.log(error);
  }
}

// 保存一篇文章
async function saveArticleLocal(articleDict) {
  try {
    await db.articles.add(articleDict, articleDict.id);
    console.log("保存成功！");
  } catch (error) {
    console.log(error);
  }
}

/**
 * 更新一篇文章
 * @param {string} uuid
 * @param {object} changes Object containing the key paths to each property you want to change (每个key:value是要更新的字段及更新值)
 */
async function updateArticleLocal(uuid, changes) {
  try {
    await db.articles.update(uuid, changes);
    console.log("更新成功！");
  } catch (error) {
    console.log(error);
  }
}

// 删除一篇文章
async function delArticleLocal(uuid) {
  try {
    await db.articles.delete(uuid);
    console.log("删除成功！");
  } catch (error) {
    console.log(error);
  }
}

export {
  getArticleBatchLocal,
  getArticleLocal,
  saveArticleBatchLocal,
  saveArticleLocal,
  updateArticleLocal,
  delArticleLocal,
};
