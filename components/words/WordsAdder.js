import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {
  addWordsToVocabulary,
  deleteWordsFromVocabulary,
} from "../../redux/slices/vocabularySlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Uploader from "../Uploader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "../Alert";
import Stack from "@mui/material/Stack";

export default function WordsAdder({}) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState("txt");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] =
    useState("每行一个单词，请勿输入任何其他符号");

  const handleChange = (e) => {
    setError(false);
    setHelperText("每行一个单词，请勿输入任何其他符号");
    setInputValue(e.target.value);
  };
  const checkInputTxt = () => {
    try {
      const arr = inputValue.split("\n");
      for (const word of arr) {
        if (word && !/^[\w-\s]+$/.test(word.trim())) {
          setHelperText(
            `"${word}"不是合法的单词，请勿输入任何其他符号，每行一个单词`
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const [message, setMessage] = useState({ duration: 6000 });

  const addWords = (vocabulary, wordsToAdd) => {
    dispatch(
      addWordsToVocabulary({
        words: wordsToAdd,
        vocabulary,
      })
    );

    // 加到生词表的词就要从熟词表移除，反之亦然，避免同一个词既是生词又是熟词
    if (vocabulary === "newWords" || vocabulary === "familiarWords") {
      dispatch(
        deleteWordsFromVocabulary({
          words: wordsToAdd,
          vocabulary: vocabulary === "newWords" ? "familiarWords" : "newWords",
        })
      );
    }
  };

  const addWordsFromTxt = (vocabulary) => {
    if (!checkInputTxt()) {
      setError(true);
      return;
    }
    const wordsToAdd = inputValue
      .split("\n")
      .filter((x) => x)
      .map((x) => ({ word: x.trim().toLowerCase() }));

    addWords(vocabulary, wordsToAdd);

    setMessage({
      ...message,
      content: `操作成功，已添加${wordsToAdd.length}个单词`,
      type: "success",
    });
  };

  function addWordsFromJson(jsonData) {
    try {
      const data = JSON.parse(decodeURIComponent(jsonData));

      if (
        !data.known &&
        !data.unknown &&
        !data.target &&
        !data.newWords &&
        !data.familiarWords &&
        !data.targetWords
      ) {
        setError(true);
        return;
      }

      const format = (x) => {
        if (typeof x === "string") {
          return { word: x };
        }
        if (x.word) {
          return x;
        }
      };

      console.log(data);

      // 兼容旧版
      if (data.known && data.unknown) {
        addWords("newWords", data.unknown.map(format));
        addWords("familiarWords", data.known.map(format));
      } else if (data.newWords && data.familiarWords) {
        if (Array.isArray(data.newWords)) {
          addWords("newWords", data.newWords.map(format));
          addWords("familiarWords", data.familiarWords.map(format));
        } else {
          setError(true);
          return;
        }
      }
      if (data.target) {
        addWords("targetWords", data.target.map(format));
      }
      if (data.targetWords) {
        addWords("targetWords", data.targetWords.map(format));
      }

      setMessage({
        ...message,
        content: `操作成功`,
        type: "success",
      });
      setInputValue("");
    } catch (error) {
      setMessage({
        ...message,
        content: error,
        type: "error",
      });
    }
  }

  const handleAddToNew = () => addWordsFromTxt("newWords");
  const handleAddToFamiliar = () => addWordsFromTxt("familiarWords");
  const handleAddToTarget = () => addWordsFromTxt("targetWords");

  const onUpload = (payload) => {
    setInputValue(payload);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        添加单词
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>
          添加单词
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack sx={{ mb: 2 }} direction="row" spacing={1}>
            <span
              onClick={() => {
                setError(false);
                setInputType("json");
                setHelperText(
                  '格式示例：{"newWord":["apple", "the"], "familiarWord": ["big", "a"], "targetWord": ["apple", "big"]'
                );
              }}
            >
              <Uploader onUpload={onUpload}>从json导入</Uploader>
            </span>
            <Uploader
              onClick={() => {
                setInputType("txt");
                setHelperText("每行一个单词，请勿输入任何其他符号");
              }}
              onUpload={onUpload}
            >
              从txt导入
            </Uploader>
          </Stack>
          <Box>
            <div>
              <TextField
                id="outlined-basic"
                label="新单词"
                variant="outlined"
                placeholder="请输入要添加的单词"
                helperText={helperText}
                multiline
                error={error}
                value={inputValue}
                onChange={handleChange}
                rows={5}
                sx={{ mr: 1, maxWidth: 266 }}
              />
              <Button onClick={() => setInputValue("")}>清空</Button>
            </div>
          </Box>
          <Alert message={message} />
        </DialogContent>
        <DialogActions>
          {inputType === "txt" && (
            <>
              <Button onClick={handleAddToNew}>添加到生词</Button>
              <Button onClick={handleAddToFamiliar}>添加到熟词</Button>
              <Button onClick={handleAddToTarget}>添加到目标词</Button>
            </>
          )}
          {inputType === "json" && (
            <Button onClick={() => addWordsFromJson(inputValue)}>
              导入词库数据
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
