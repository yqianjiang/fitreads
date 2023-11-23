import React, { useState } from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleEditor from "./ArticleEditor";
import ArticleControls from "./ArticleControls";
import ArticleBody from "./ArticleBody";
import AudioPlayer from "../AudioPlayer";
import { useDispatch } from "react-redux";
import {
  addWordsToVocabulary,
  deleteWordsFromVocabulary,
} from "../../redux/slices/vocabularySlice";
import { fetchTranslation, fetchTranslationBatch } from "../../lib/api/dict";

const useControl = () => {
  const [mode, setMode] = useState({
    showTrans: true,
    showSentenceTrans: false,
    markNewWord: false,
  });
  const [highlightList, setHighlightList] = useState(["newWord"]);
  const highlightOptions = ["newWord", "unseen", "target"];
  const highlightOptionsLabels = {
    newWord: "生词",
    unseen: "未标记词",
    target: "目标词",
  };
  return {
    mode,
    setMode,
    highlightList,
    setHighlightList,
    highlightOptions,
    highlightOptionsLabels,
  };
};

const useDictData = (initialData) => {
  const [data, setData] = useState({
    ...initialData,
    translations: {},
  });

  const _findWordTrans = async (words) => {
    if (typeof words === "string") {
      const trans = await fetchTranslation(words);
      // setData({...data, translations: })
      return { ...data.translations, [words]: trans };
    } else {
      const trans = await fetchTranslationBatch({ words });
      // setData({...data, translations: })
      console.log("翻译：");
      console.log(trans);
      return { ...data.translations, ...trans };
    }
  };

  const _removeTranslations = (word) => {
    if (typeof word === "string") {
      const { [word]: a, ...res } = data.translations;
      // setData({ ...data, translations: res });
      return res;
    } else {
      console.log(word, "待实现");
    }
  };

  async function markAsNew(type, word) {
    setData({
      ...data,
      newWord: [...data.newWord, word],
      [type]: data[type].filter((x) => x !== word),
      // 生词需要增加翻译
      translations: await _findWordTrans(word),
    });
  }

  function markAsFamiliar(type, word) {
    setData({
      ...data,
      familiarWord: [...data.familiarWord, word],
      [type]: data[type].filter((x) => x !== word),
      // 熟词不用显示翻译了
      translations: _removeTranslations(word),
    });
  }

  function markAllAsFamiliar(type, words) {
    setData({
      ...data,
      familiarWord: [...data.familiarWord, ...words],
      [type]: data[type].filter((x) => !words.includes(x)),
      // 熟词不用显示翻译了
      translations: _removeTranslations(words),
    });
  }

  function onRemove(type, token) {
    if (type === "newWord") {
      markAsFamiliar(type, token);
    } else {
      markAsNew(type, token);
    }
  }

  function toggleFamiliar(token) {
    if (data.newWord.includes(token)) {
      // 点击生词变熟词
      markAsFamiliar("newWord", token);
      // 用户词表变化收集
    } else if (data.familiarWord.includes(token)) {
      // 点击熟词变生词
      markAsNew("familiarWord", token);
      // 用户词表变化收集
    } else {
      // 点击unseen变生词
      markAsNew("unseenWord", token);
      // 用户词表变化收集
    }
  }

  async function toggleTrans(token) {
    let translations;
    if (token in data.translations) {
      translations = _removeTranslations(token);
    } else {
      translations = await _findWordTrans(token);
    }
    setData({ ...data, translations });
  }

  const dispatch = useDispatch();

  function updateWordDict() {
    // 自动把unseenWord当作familiarWord
    markAllAsFamiliar("unseenWord", data.unseenWord);

    // 把data的更新同步到wordDict
    saveVocabulary();

    function saveVocabulary() {
      dispatch(
        addWordsToVocabulary({
          words: data.newWord.map((newWord) => ({ word: newWord, source: 'reading' })),
          vocabulary: "newWords",
        })
      );
      dispatch(
        addWordsToVocabulary({
          words: [...data.familiarWord, ...data.unseenWord].map((newWord) => ({
            word: newWord,
            source: 'reading'
          })),
          vocabulary: "familiarWords",
        })
      );
      dispatch(
        deleteWordsFromVocabulary({
          words: data.newWord.map((newWord) => ({ word: newWord, source: 'reading' })),
          vocabulary: "familiarWords",
        })
      );
      dispatch(
        deleteWordsFromVocabulary({
          words: data.familiarWord.map((newWord) => ({ word: newWord })),
          vocabulary: "newWords",
        })
      );
    }
  }

  return { data, toggleFamiliar, toggleTrans, updateWordDict };
};

const Article = ({ initialData, sentences, ...props }) => {
  const controlProps = useControl();
  const { data, toggleFamiliar, toggleTrans, updateWordDict } =
    useDictData(initialData);

  return (
    <article>
      <ArticleEditor {...props} data={data} />
      <ArticleHeader {...props} data={data} />
      {/* <AudioPlayer content={'Why Reading is the Key to Mastering English'} /> */}
      <ArticleControls
        updateWordDict={updateWordDict}
        wordsUnique={props.wordsUnique}
        {...controlProps}
      />
      <ArticleBody
        mode={controlProps.mode}
        highlightList={controlProps.highlightList}
        {...{ paragraphs: sentences, toggleFamiliar, toggleTrans }}
        {...props}
        {...data}
      />
    </article>
  );
};
export default Article;
