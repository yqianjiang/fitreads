const BASE_URL = 'https://yqianjiang.github.io/tridict-reading/'
const postUrl = BASE_URL+'/posts.json'

export async function getSortedPostsData() {
  const res = await fetch(postUrl);  // Next.js polyfills fetch() on both the client and server. You don't need to import it.
  return res.json();
}

export async function getPostData(id) {
  const res = await fetch(postUrl);
  const posts = await res.json();
  return posts.filter(post=>post.id==id)[0] || null;
}
