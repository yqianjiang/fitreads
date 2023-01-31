import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addWordToVocabulary,
  updateWordInVocabulary,
  deleteWordFromVocabulary,
  readVocabulary,
} from "../../redux/slices/vocabularySlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "../../components/Layout";

const WordListPage = () => {
  const [newWord, setNewWord] = useState("");
  const unknownWords = useSelector((state) => state.vocabulary.unknownWords);
  const knownWords = useSelector((state) => state.vocabulary.knownWords);
  const targetWords = useSelector((state) => state.vocabulary.targetWords);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setNewWord(e.target.value);
  };
  useEffect(() => {
    dispatch(readVocabulary());
  }, []);

  return (
    <Layout pageName="词表管理">
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={newWord}
        onChange={handleChange}
      />
      <Button
        onClick={() =>
          dispatch(
            addWordToVocabulary({
              word: { word: newWord },
              vocabulary: "unknownWords",
            })
          )
        }
      >
        添加到生词
      </Button>
      <Button
        onClick={() =>
          dispatch(
            addWordToVocabulary({
              word: { word: newWord },
              vocabulary: "knownWords",
            })
          )
        }
      >
        添加到熟词
      </Button>
      <Button
        onClick={() =>
          dispatch(
            addWordToVocabulary({
              word: { word: newWord },
              vocabulary: "targetWords",
            })
          )
        }
      >
        添加到目标词
      </Button>
      <Button
        onClick={() =>
          dispatch(
            deleteWordFromVocabulary({
              word: { word: newWord },
              vocabulary: "targetWords",
            })
          )
        }
      >
        从目标词移除
      </Button>
      <p>生词：</p>
      <ul>
        {Object.keys(unknownWords).map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      <p>熟词：</p>
      <ul>
        {Object.keys(knownWords).map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      <p>目标词：</p>
      <ul>
        {Object.keys(targetWords).map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default WordListPage;
