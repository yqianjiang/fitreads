import lemmatize from "wink-lemmatizer";

export function findLemma(word) {
  word = word.toLowerCase();
  word = lemmatize.verb(word);
  word = lemmatize.noun(word);
  word = lemmatize.adjective(word);
  return word;
}