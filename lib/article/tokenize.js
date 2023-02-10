import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";
import as from "wink-nlp/src/as.js";
import its from "wink-nlp/src/its.js";

const nlp = winkNLP(model);

export function tokenize(plainText, title) {
  const doc = nlp.readDoc(plainText);
  const tokens = doc.tokens().filter((t) => t.out(its.type) === "word");
  const wordsFreq = tokens.out(its.lemma, as.freqTable);
  const wordsUnique = wordsFreq.map((arr) => arr[0]);
  const sentences = doc.sentences().out();
  // tokens.each((e) => e.markup());
  // doc.sentences().each((e) => e.markup());
  // const markedTokenText = doc.out(its.markedUpText);
  title = title || sentences[0];
  return {
    title,
    plainText,
    // markedTokenText,
    totalWords: tokens.out().length,
    wordsUnique,
    // wordsFreq,
    sentences: sentences.map(x=>{
      return [{
        sentence: x,
        translation: '',
        tokens: nlp.readDoc(x).tokens().filter(t => t.out(its.type) === 'word').out(),
      }]
    }),
  };
}
