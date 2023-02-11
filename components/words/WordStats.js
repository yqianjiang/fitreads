import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

export default function WordStats() {
  const newWords = useSelector((state) => state.vocabulary.newWords);
  const familiarWords = useSelector((state) => state.vocabulary.familiarWords);
  const targetWords = useSelector((state) => state.vocabulary.targetWords);

  const newWordsLength = useMemo(
    () => Object.keys(newWords).length,
    [newWords]
  );

  const familiarWordsLength = useMemo(
    () => Object.keys(familiarWords).length,
    [familiarWords]
  );

  const knowTargetRatio = useMemo(() => {
    let familiarTargetWordsNum = 0;
    let targetWordsNum = 0;
    for (const word in targetWords) {
      if (word in familiarWords) {
        familiarTargetWordsNum++;
      }
      targetWordsNum++;
    }
    if (targetWordsNum) {
      return familiarTargetWordsNum / targetWordsNum;
    } else {
      return 0;
    }
  }, [familiarWords, targetWords]);

  return (
    <Box>
      <Grid>
        <Paper sx={{p: 2}}>
          {knowTargetRatio > 0 && (
            <Typography>目标词已掌握{knowTargetRatio}%</Typography>
          )}
          <Typography>已记录生词{newWordsLength}个</Typography>
          <Typography>已记录熟词{familiarWordsLength}个</Typography>
        </Paper>
      </Grid>
      {/* <Grid>
        <Paper>
          <Typography>生词分布（X%高考词汇，Y%雅思词汇）</Typography>
        </Paper>
      </Grid> */}
    </Box>
  );
}
