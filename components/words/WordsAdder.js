import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addWordToVocabulary } from "../../redux/slices/vocabularySlice";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function WordsAdder({}) {
  const [newWord, setNewWord] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setNewWord(e.target.value);
  };

  return (
    <>
      <Grid>
        <TextField
          id="outlined-basic"
          label="新单词"
          variant="outlined"
          value={newWord}
          onChange={handleChange}
        />
      </Grid>
      <Grid>
        <Button
          onClick={() =>
            dispatch(
              addWordToVocabulary({
                word: { word: newWord },
                vocabulary: "newWords",
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
                vocabulary: "familiarWords",
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
      </Grid>
    </>
  );
}
