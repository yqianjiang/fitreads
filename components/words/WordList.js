import * as React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

const sortWordsOptions = [
  {
    label: "加入时间",
    value: "createdAt",
  },
  {
    label: "词频排名",
    value: "frq",
  },
  {
    label: "字母",
    value: "alphabet",
  },
];

const sortWordsByAlphabet = (words, isDescending) => {
  if (isDescending) {
    words.sort((b, a) =>
      a.word.localeCompare(b.word, "en", { ignorePunctuation: true })
    );
  } else {
    words.sort((a, b) =>
      a.word.localeCompare(b.word, "en", { ignorePunctuation: true })
    );
  }
  return words;
};

const sortWordsByCreatedAt = (words, isDescending) => {
  if (!words[0]?.createdAt) {
    return words;
  }

  if (isDescending) {
    words.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else {
    words.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  return words;
};

const sortWordsByFrq = (words, isDescending) => {
  if (!words[0]?.frq) {
    return words;
  }

  if (isDescending) {
    words.sort((a, b) => {
      return b.frq - a.frq;
    });
  } else {
    words.sort((a, b) => {
      return a.frq - b.frq;
    });
  }

  return words;
};

const sortWords = (wordDict, sortKey, isDescending) => {
  if (!wordDict) return [];

  const words = Object.values(wordDict);

  switch (sortKey) {
    case "alphabet":
      return sortWordsByAlphabet(words, isDescending);
    case "createdAt":
      return sortWordsByCreatedAt(words, isDescending);
    case "frq":
      return sortWordsByFrq(words, isDescending);
  }

  return words;
};

export default function WordList({ wordsDict, actions }) {
  const [editMode, setEditMode] = React.useState(false);
  const [selectedWords, setSelectedWords] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState("alphabet");
  const [isDescending, setIsDescending] = React.useState(false);

  const handleClickWord = (word) => () => {
    if (editMode) {
      toggleCheck(word);
    } else {
      // 查看单词详情
    }
  };

  const toggleCheck = (value) => {
    const currentIndex = selectedWords.indexOf(value);
    const newChecked = [...selectedWords];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedWords(newChecked);
  };

  const handleChangeOrder = (e) => {
    setSelectedOrder(e.target.value);
  };

  const words = React.useMemo(
    () => sortWords(wordsDict, selectedOrder, isDescending),
    [wordsDict, selectedOrder, isDescending]
  );

  const onSubmit = (callback) => {
    const payload = [];
    for (const word of selectedWords) {
      payload.push(wordsDict[word]);
    }
    callback(payload);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="sort-method-selection">排序</InputLabel>
          <Select
            value={selectedOrder}
            onChange={handleChangeOrder}
            input={<OutlinedInput label="排序" id="sort-method-selection" />}
          >
            {sortWordsOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={isDescending}
              onChange={(e) => setIsDescending(e.target.checked)}
              name="descending"
            />
          }
          label="倒序"
          labelPlacement="start"
        />
      </Stack>
      <Button onClick={() => setEditMode(!editMode)}>
        {editMode ? "退出编辑" : "编辑"}
      </Button>
      {editMode && (
        <>
          {actions?.map((action) => (
            <Button
              key={action.label}
              onClick={() => onSubmit(action.callback)}
            >
              {action.label}
            </Button>
          ))}
        </>
      )}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {words.map(({ word, translation }) => {
          const labelId = `${word}`;

          return (
            <React.Fragment key={word}>
              <ListItem disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleClickWord(word)}
                  dense
                >
                  {editMode && (
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selectedWords.indexOf(word) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    id={labelId}
                    primary={word}
                    secondary={translation ?? ""}
                  />
                </ListItemButton>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
}
