import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { NextLinkComposed } from "./Link";

export default function StartGuide({ open, onClose }) {
  const [level, setLevel] = React.useState("");
  const [mode, setMode] = React.useState("");

  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={onClose}>
      <DialogTitle>
        词汇摸底
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ minWidth: "300px" }}>
        <Typography>
          在开始分析阅读文章之前，我们需要知道您的英语水平。您可以选择任意一种方式开始。
        </Typography>
        <ul>
          <li>
            <Button onClick={() => setMode("level")}>选择已有词表</Button>
            比较粗糙的方式，但可以先从这里开始（所选择的词表全部会当作生词表），在后续阅读过程中再通过标注来让您的词汇表越来越个性化。
          </li>
          <li>
            <Button>导入词表</Button>
            如果您在别的App有收藏并导出生词表，可以一键导入。如果你有使用背单词等App，也可以导入已掌握单词列表。
          </li>
          <li>
            <Button
              component={NextLinkComposed}
              to={{ pathname: "word-test/" }}
            >
              词汇测试
            </Button>
            开发中...
          </li>
        </ul>

        {mode === "level" && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              请选择您的英语水平
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={level}
              label="Level"
              onChange={handleChange}
            >
              <MenuItem value={10}>小学</MenuItem>
              <MenuItem value={20}>初中</MenuItem>
              <MenuItem value={30}>高中</MenuItem>
              <MenuItem value={30}>四级</MenuItem>
              <MenuItem value={30}>六级</MenuItem>
              <MenuItem value={30}>雅思</MenuItem>
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions sx={{ flexWrap: "wrap" }}>
        <Button
          variant="contained"
          component={NextLinkComposed}
          to={{
            pathname: "add-article/",
          }}
        >
          保存，开始分析
        </Button>
      </DialogActions>
    </Dialog>
  );
}
