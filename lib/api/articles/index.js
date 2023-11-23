import {
  getArticleBatchLocal,
  getArticleLocal,
  saveArticleBatchLocal,
  saveArticleLocal,
  updateArticleLocal,
  delArticleLocal,
} from "./articlesDB";
import { BASE_URL } from "../constants";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const postUrl = BASE_URL + "/posts.json";

export async function getSortedArticlesData() {
  try {
    const sortedArticles = getArticleBatchLocal({
      batchSize: 20,
      startIdx: 0,
      orderBy: "createdAtDescending",
    });
    return sortedArticles;
  } catch (e) {
    console.log(e);
  }

  // 再查接口有没有
  return [];
}

export async function getArticleData(id) {
  // 先查本地有没有
  try {
    return getArticleLocal(id) || null;
  } catch (e) {
    console.log(e);
    return null;
  }

  // 再查接口有没有
}

export async function saveArticleData(post) {
  // 先存本地（新增一篇）
  saveArticleLocal(post);

  // 再存接口
}

export async function delArticle(id) {
  await delArticleLocal(id);
}

export async function updateArticle(id, changes) {
  await updateArticleLocal(id, changes);
}

export async function fetchExampleArticle() {
  try {
    const res = await fetch(`${BASE_URL}/articles/example.json`);
    const articles = await res.json();
    return articles;
  } catch (e) {
    console.log(e);
  }
}