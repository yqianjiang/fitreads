export const sortArticlesOptions = [
  {
    label: "加入时间",
    value: "lastModified",
  },
  // {
  //   label: "词频重要性",
  //   value: "frq",
  // },
  {
    label: "总字数",
    value: "totalWords",
  },
];

const sortArticlesByCreatedAt = (articles, isDescending) => {
  if (!articles[0]?.lastModified) {
    return articles;
  }

  if (isDescending) {
    articles.sort((a, b) => {
      return new Date(b.lastModified) - new Date(a.lastModified);
    });
  } else {
    articles.sort((a, b) => {
      return new Date(a.lastModified) - new Date(b.lastModified);
    });
  }

  return articles;
};

const sortArticlesByTotalWords = (articles, isDescending) => {
  if (!articles[0]?.totalWords) {
    return articles;
  }

  if (isDescending) {
    articles.sort((a, b) => {
      return b.totalWords - a.totalWords;
    });
  } else {
    articles.sort((a, b) => {
      return a.totalWords - b.totalWords;
    });
  }

  return articles;
};

export const sortArticles = (articles, sortKey, isDescending) => {
  if (!articles) return [];

  switch (sortKey) {
    case "totalWords":
      return sortArticlesByTotalWords(articles, isDescending);
    case "lastModified":
      return sortArticlesByCreatedAt(articles, isDescending);
  }

  return articles;
};
