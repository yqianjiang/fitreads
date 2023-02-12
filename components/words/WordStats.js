import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";

import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getLocal } from "../../lib/stores";
import { dictionaryNameMap } from "../../lib/constants";
import WordsManager from "./WordsManager";

export default function WordStats({ localDicts }) {
  const newWords = useSelector((state) => state.vocabulary.newWords);
  const familiarWords = useSelector((state) => state.vocabulary.familiarWords);
  const targetWords = useSelector((state) => state.vocabulary.targetWords);
  const [commonDicts, setCommonDicts] = useState([]);

  const newWordsLength = useMemo(
    () => Object.keys(newWords).length,
    [newWords]
  );

  const familiarWordsLength = useMemo(
    () => Object.keys(familiarWords).length,
    [familiarWords]
  );

  const getRatio = (words, familiarWords) => {
    let familiarTargetWordsNum = 0;
    let targetWordsNum = 0;
    for (const word of words) {
      if (word in familiarWords) {
        familiarTargetWordsNum++;
      }
      targetWordsNum++;
    }
    if (targetWordsNum) {
      return ((familiarTargetWordsNum / targetWordsNum) * 100).toFixed(2);
    } else {
      return 0;
    }
  };

  const familiarTargetRatio = useMemo(() => {
    return getRatio(Object.keys(targetWords), familiarWords);
  }, [familiarWords, targetWords]);

  useEffect(() => {
    const newCommonDicts = [];
    for (const dictionary of localDicts) {
      const words = getLocal(dictionary);
      newCommonDicts.push({
        dictionary,
        words,
      });
    }
    setCommonDicts(newCommonDicts);
  }, [localDicts]);

  const [drawerState, setDrawerState] = React.useState({});

  const toggleDrawer = (key, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [key]: open });
  };

  return (
    <Box>
      <Grid>
        <Paper sx={{ p: 2 }}>
          {familiarTargetRatio > 0 && (
            <Typography>目标词已掌握{familiarTargetRatio}%</Typography>
          )}
          <Typography>已记录生词{newWordsLength}个</Typography>
          <Typography>已记录熟词{familiarWordsLength}个</Typography>
        </Paper>
      </Grid>
      <Grid>
        <Paper sx={{ p: 2 }}>
          {commonDicts.map(({ dictionary, words }) => (
            <Typography key={dictionary}>
              {dictionaryNameMap[dictionary]}单词：熟词
              {getRatio(words, familiarWords)}%，生词{getRatio(words, newWords)}
              %
              <Button onClick={toggleDrawer(dictionary, true)} sx={{ ml: 1 }}>
                查看
              </Button>
              <Drawer
                anchor={"bottom"}
                open={drawerState[dictionary]}
                onClose={toggleDrawer(dictionary, false)}
              >
                <Paper sx={{height: 400}}>
                  <WordsManager wordsFilter={words} fixed={true} />
                </Paper>
              </Drawer>
            </Typography>
          ))}
        </Paper>
      </Grid>
    </Box>
  );
}
