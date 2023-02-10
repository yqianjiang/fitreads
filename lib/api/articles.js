import { getLocal, setLocal } from "../stores";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const postUrl = BASE_URL + "/posts.json";

export async function getSortedPostsData() {
  // 先查本地有没有
  let posts = getLocal("articles");

  // 再查接口有没有
  // if (!posts) {
  //   const res = await fetch(postUrl); // Next.js polyfills fetch() on both the client and server. You don't need to import it.
  //   posts = await res.json();
  // }

  // 默认暂时先按照lastModified排序
  const sortedPosts = Object.values(posts).sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

  return sortedPosts;
}

export async function getPostData(id) {
  // 先查本地有没有
  let posts = getLocal("articles");

  // 再查接口有没有
  // if (!posts) {
  //   const res = await fetch(postUrl);
  //   posts = await res.json();
  // }

  return posts[id] || null;
}

export async function savePostData(post) {
  // 先存本地（新增一篇）
  const posts = getLocal("articles") || {};
  posts[post.id] = post;
  setLocal("articles", posts);

  // 再存接口
}
