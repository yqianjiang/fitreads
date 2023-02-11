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
import { Typography } from "@mui/material";
import Alert from "../Alert";

export default function WordsAdder({}) {
  const [newWord, setNewWord] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [helperText, setHelperText] =
    useState("每行一个单词，请勿输入任何其他符号");

  const handleChange = (e) => {
    setError(false);
    setHelperText("每行一个单词，请勿输入任何其他符号");
    setNewWord(e.target.value);
  };
  const checkInputWords = () => {
    try {
      const arr = newWord.split("\n");
      for (const word of arr) {
        if (word && !/^[\w-\s]+$/.test(word)) {
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

  const addWords = (vocabulary) => {
    if (!checkInputWords()) {
      setError(true);
      return;
    }
    const wordsToAdd = newWord
      .split("\n")
      .filter((x) => x)
      .map((x) => ({ word: x }));
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

    setMessage({
      ...message,
      content: `操作成功，已添加${wordsToAdd.length}个单词`,
      type: "success",
    });
  };

  const handleAddToNew = () => addWords("newWords");
  const handleAddToFamiliar = () => addWords("familiarWords");
  const handleAddToTarget = () => addWords("targetWords");

  const onUpload = (payload) => {
    setNewWord(payload);
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
    <div>
      <Button variant="outlined" sx={{ mb: 1 }} onClick={handleClickOpen}>
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
          <Box sx={{ mb: 2 }}>
            <Uploader onUpload={onUpload}>从文件导入</Uploader>
            <Typography component="span" sx={{ ml: 1, fontSize: 14 }}>
              支持格式：txt，md
            </Typography>
          </Box>
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
                value={newWord}
                onChange={handleChange}
                rows={5}
                sx={{ mr: 1, maxWidth: 266 }}
              />
              <Button onClick={() => setNewWord("")}>清空</Button>
            </div>
          </Box>
          <Alert message={message} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddToNew}>添加到生词</Button>
          <Button onClick={handleAddToFamiliar}>添加到熟词</Button>
          <Button onClick={handleAddToTarget}>添加到目标词</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
