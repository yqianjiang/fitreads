export const sortWordsOptions = [
  {
    label: "加入时间",
    value: "createdAt",
  },
  {
    label: "词频排名",
    value: "frq",
  },
  {
    label: "字母",
    value: "alphabet",
  },
];

const sortWordsByAlphabet = (words, isDescending) => {
  if (isDescending) {
    words.sort((b, a) =>
      a.word.localeCompare(b.word, "en", { ignorePunctuation: true })
    );
  } else {
    words.sort((a, b) =>
      a.word.localeCompare(b.word, "en", { ignorePunctuation: true })
    );
  }
  return words;
};

const sortWordsByCreatedAt = (words, isDescending) => {
  if (!words[0]?.createdAt) {
    return words;
  }

  if (isDescending) {
    words.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else {
    words.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  return words;
};

const sortWordsByFrq = (words, isDescending) => {
  if (!words[0]?.frq) {
    return words;
  }

  if (isDescending) {
    words.sort((a, b) => {
      return b.frq - a.frq;
    });
  } else {
    words.sort((a, b) => {
      return a.frq - b.frq;
    });
  }

  return words;
};

export const sortWords = (wordDict, sortKey, isDescending) => {
  if (!wordDict) return [];

  const words = Object.values(wordDict);

  switch (sortKey) {
    case "alphabet":
      return sortWordsByAlphabet(words, isDescending);
    case "createdAt":
      return sortWordsByCreatedAt(words, isDescending);
    case "frq":
      return sortWordsByFrq(words, isDescending);
  }

  return words;
};
