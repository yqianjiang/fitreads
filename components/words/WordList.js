import * as React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SortSelection from "../SortSelection";
import LazyList from "../LazyList";
import { sortWords, sortWordsOptions } from "./lib/sortWords";

function renderRow({ item, index, handleClickWord, editMode, selectedWords, ...props }) {
  const { word, translation } = item;
  const labelId = `${word}`;

  return (
    <React.Fragment key={word}>
      <ListItem disablePadding {...props}>
        <ListItemButton role={undefined} onClick={handleClickWord(word)} dense>
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
}

export default function WordList({ wordsDict, actions }) {
  const [editMode, setEditMode] = React.useState(false);
  const [selectedWords, setSelectedWords] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState("alphabet");
  const [isDescending, setIsDescending] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  const handleCheckAll = () => {
    if (checkAll) {
      setSelectedWords([]);
    } else {
      setSelectedWords(words.map(({ word }) => word));
    }
    setCheckAll(!checkAll);
  };

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

    if (newChecked.length === words.length) {
      setCheckAll(true);
    }
    if (!newChecked.length) {
      setCheckAll(false);
    }
  };

  const onSubmit = (callback) => {
    const payload = [];
    for (const word of selectedWords) {
      payload.push(wordsDict[word]);
    }
    callback(payload);
  };

  const words = React.useMemo(
    () => sortWords(wordsDict, selectedOrder, isDescending),
    [wordsDict, selectedOrder, isDescending]
  );

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap={"wrap"}>
        <SortSelection
          {...{
            selectedOrder,
            setSelectedOrder,
            isDescending,
            setIsDescending,
            options: sortWordsOptions,
          }}
        />
        <Typography>共{words.length}词</Typography>
      </Stack>
      {editMode && (
        <Checkbox
          checked={checkAll}
          onChange={handleCheckAll}
          inputProps={{ "aria-label": "checkAll" }}
        />
      )}
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
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <LazyList
          data={words}
          renderRow={(props) =>
            renderRow({ handleClickWord, editMode, selectedWords, ...props })
          }
        ></LazyList>
      </Box>
    </>
  );
}
