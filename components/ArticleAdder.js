import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const ArticleAdder = ({ handleAnalyzeClick }) => {
  const [textareaVal, setTextareaVal] = useState("");

  const handleTextareaChange = (e) => setTextareaVal(e.target.value);
  const handleClearClick = () => setTextareaVal("");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      sx={{
        marginTop: "1rem",
      }}
    >
      <TextField
        value={textareaVal}
        onChange={handleTextareaChange}
        multiline
        rows={4}
        placeholder="Write your article here..."
        fullWidth
      />
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          marginTop: "1rem",
        }}
      >
        <Button
          display={textareaVal ? "block" : "none"}
          disabled={!textareaVal}
          onClick={handleClearClick}
        >
          清空
        </Button>
        <Button
          disabled={!textareaVal}
          onClick={() => handleAnalyzeClick(textareaVal)}
        >
          分析
        </Button>
      </Box>
    </Box>
  );
};

export default ArticleAdder;
