import { Box, Checkbox, Select, Button, FormControlLabel } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ArticleControls = ({
  mode,
  setMode,
  highlightList,
  setHighlightList,
  highlightOptions,
  highlightOptionsLabels,
  updateWordDict,
}) => {
  const handleChangeHighlight = (event) => {
    const {
      target: { value },
    } = event;
    setHighlightList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" alignItems="center">
        <Box mr={1}>显示设置：</Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={mode.showTrans}
              onChange={() => setMode({ ...mode, showTrans: !mode.showTrans })}
            />
          }
          label="单词翻译"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={mode.showSentenceTrans}
              onChange={() =>
                setMode({ ...mode, showSentenceTrans: !mode.showSentenceTrans })
              }
            />
          }
          label="整句翻译"
        />
      </Box>
      <Box display="flex" alignItems="center">
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="highlight-multiple-chip-label">高亮选项</InputLabel>
          <Select
            labelId="highlight-multiple-chip-label"
            id="highlight-multiple-chip"
            multiple
            value={highlightList}
            onChange={handleChangeHighlight}
            input={<OutlinedInput id="select-multiple-chip" label="高亮选项" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={highlightOptionsLabels[value]} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {highlightOptions.map((option) => (
              <MenuItem
                key={option}
                value={option}
                // style={getStyles(option, highlightList, theme)}
              >
                {highlightOptionsLabels[option]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          onClick={() =>
            setMode({ ...mode, markUnknownWord: !mode.markUnknownWord })
          }
        >
          {mode.markUnknownWord ? "停止标记" : "开始标记"}
        </Button>
        <Button onClick={updateWordDict()}>更新词表</Button>
      </Box>
    </Box>
  );
};

export default ArticleControls;
