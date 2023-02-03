import React, { useState } from "react";
import ArticleHeader from "./ArticleHeader";
import ArticleControls from "./ArticleControls";
import ArticleBody from "./ArticleBody";
import { useDispatch } from "react-redux";
import {
  addWordsToVocabulary,
  deleteWordsFromVocabulary,
} from "../../redux/slices/vocabularySlice";

const useControl = () => {
  const [mode, setMode] = useState({
    showTrans: true,
    showSentenceTrans: false,
    markUnknownWord: true,
  });
  const [highlightList, setHighlightList] = useState(["unknown"]);
  const highlightOptions = ["unknown", "unseen", "target"];
  const highlightOptionsLabels = {
    unknown: "生词",
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

  function markAsUnknown(type, word) {
    setData({
      ...data,
      unknownWord: [...data.unknownWord, word],
      [type]: data[type].filter((x) => x !== word),
    });

    // 熟词不用显示翻译了
    // delete data.translations[word];
  }

  function markAsKnown(type, word) {
    setData({
      ...data,
      knownWord: [...data.knownWord, word],
      [type]: data[type].filter((x) => x !== word),
    });

    // 生词需要增加翻译
    // _findWordTrans(word);
  }

  function markAllAsKnown(type, words) {
    setData({
      ...data,
      knownWord: [...data.knownWord, ...words],
      [type]: data[type].filter((x) => !words.includes(x)),
    });

    // 生词需要增加翻译
    // _findWordTrans(word);
  }

  function onRemove(type, token) {
    if (type === "unknownWord") {
      markAsKnown(type, token);
    } else {
      markAsUnknown(type, token);
    }
  }

  function toggleKnown(token) {
    if (data.unknownWord.includes(token)) {
      // 点击生词变熟词
      markAsKnown("unknownWord", token);
      // 用户词表变化收集
    } else if (data.knownWord.includes(token)) {
      // 点击熟词变生词
      markAsUnknown("knownWord", token);
      // 用户词表变化收集
    } else {
      // 点击unseen变生词
      markAsUnknown("unseenWord", token);
      // 用户词表变化收集
    }
  }

  function toggleTrans(token) {
    console.log("toggleTrans", token);
  }

  const dispatch = useDispatch();

  function updateWordDict() {
    // 自动把unseenWord当作knownWord
    markAllAsKnown("unseenWord", data.unseenWord);

    // 把data的更新同步到wordDict
    saveVocabulary();

    function saveVocabulary() {
      dispatch(
        addWordsToVocabulary({
          words: data.unknownWord.map((newWord) => ({ word: newWord })),
          vocabulary: "unknownWords",
        })
      );
      dispatch(
        addWordsToVocabulary({
          words: [...data.knownWord, ...data.unseenWord].map((newWord) => ({
            word: newWord,
          })),
          vocabulary: "knownWords",
        })
      );
      dispatch(
        deleteWordsFromVocabulary({
          words: data.unknownWord.map((newWord) => ({ word: newWord })),
          vocabulary: "knownWords",
        })
      );
      dispatch(
        deleteWordsFromVocabulary({
          words: data.knownWord.map((newWord) => ({ word: newWord })),
          vocabulary: "unknownWords",
        })
      );
    }
  }

  return { data, toggleKnown, toggleTrans, updateWordDict };
};

const Article = ({ initialData, sentences, ...props }) => {
  const controlProps = useControl();
  const { data, toggleKnown, toggleTrans, updateWordDict } =
    useDictData(initialData);

  return (
    <article>
      <ArticleHeader {...props} data={data} />
      <ArticleControls updateWordDict={updateWordDict} {...controlProps} />
      <ArticleBody
        mode={controlProps.mode}
        highlightList={controlProps.highlightList}
        {...{ paragraphs: sentences, toggleKnown, toggleTrans }}
        {...props}
        {...data}
      />
    </article>
  );
};
export default Article;
