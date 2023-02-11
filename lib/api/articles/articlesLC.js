import LC from "../../vendors/lc.js";

/**
 * 获取一页数据
 * @param {{category: string;
 * startIdx: number;
 * batchSize: number;
 * orderBy: "createdAtDescending" | "freqScoreDescending" | "totalWordsDescending" | "totalWordsAscending"}} params 查询条件，category为文章类别，startIdx为从第几行开始，batchSize默认一次获取10条。
 * @returns
 */
async function getArticleBatchLC(params) {
  const query = new LC.Query("Article");

  // 分类获取
  if (params.category) {
    query.equalTo("category", params.category);
  }

  // 获取一页数据
  query.limit(params.batchSize || 10);
  query.skip(params.startIdx || 0); // 会消耗查询时间
  if (params.orderBy === "createdAtDescending") {
    query.addDescending("createdAt");
  }
  if (params.orderBy === "freqScoreDescending") {
    query.addDescending("freqScore");
  }
  if (params.orderBy === "totalWordsDescending") {
    query.addDescending("totalWords");
  }
  if (params.orderBy === "totalWordsAscending") {
    query.addAscending("totalWords");
  }

  try {
    const res = await query.find();
    return res.map((x) => x.toJSON());
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * 获取一篇文章
 * @param {*} uuid
 * @returns 文章相关信息的json
 */
async function getArticleLC(uuid) {
  const query = new LC.Query("Article");
  try {
    const article = await query.get(uuid);
    return article?.toJSON();
  } catch (error) {
    console.log(error);
  }
}

/**
 * 新增一篇文章（往Article表新增一行数据）
 * @param {object} params 每个key:value是该行数据的字段和值
 */
async function saveArticleLC(params) {
  const Article = LC.Object.extend("Article");
  const article = new Article();

  // 关联用户
  const author = LC.User.current();
  article.set("author", author);

  for (const key in params) {
    article.set(key, params[key]);
  }

  try {
    await article.save();
    console.log("保存成功！");
  } catch (error) {
    console.log(error);
  }
}

/**
 * 更新一篇文章
 * @param {string} uuid
 * @param {object} params 每个key:value是要更新的字段及更新值
 */
async function updateArticleLC(uuid, params) {
  const article = LC.Object.createWithoutData("Article", uuid);
  for (const key in params) {
    article.set(key, params[key]);
  }
  try {
    await article.save();
    console.log("更新成功！");
  } catch (error) {
    console.log(error);
  }
}

async function delArticleLC(uuid) {}

export {
  getArticleBatchLC,
  getArticleLC,
  saveArticleLC,
  updateArticleLC,
  delArticleLC,
};
