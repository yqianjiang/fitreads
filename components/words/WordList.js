import * as React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export default function WordList({ wordsDict, actions }) {
  const [editMode, setEditMode] = React.useState(false);
  const [selectedWords, setSelectedWords] = React.useState([]);

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

  const words = React.useMemo(
    () => (wordsDict ? Object.values(wordsDict) : []),
    [wordsDict]
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
      {!editMode ? (
        <Button onClick={() => setEditMode(true)}>编辑</Button>
      ) : (
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
