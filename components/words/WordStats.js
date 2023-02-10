import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

export default function WordStats() {
  const unknownWords = useSelector((state) => state.vocabulary.unknownWords);
  const knownWords = useSelector((state) => state.vocabulary.knownWords);
  const targetWords = useSelector((state) => state.vocabulary.targetWords);

  const unknownWordsLength = useMemo(
    () => Object.keys(unknownWords).length,
    [unknownWords]
  );

  const knownWordsLength = useMemo(
    () => Object.keys(knownWords).length,
    [knownWords]
  );

  const knowTargetRatio = useMemo(() => {
    let knownTargetWordsNum = 0;
    let targetWordsNum = 0;
    for (const word in targetWords) {
      if (word in knownWords) {
        knownTargetWordsNum++;
      }
      targetWordsNum++;
    }
    if (targetWordsNum) {
      return knownTargetWordsNum / targetWordsNum;
    } else {
      return 0;
    }
  }, [knownWords, targetWords]);

  return (
    <Box>
      <Grid>
        <Paper sx={{p: 2}}>
          {knowTargetRatio > 0 && (
            <Typography>目标词已掌握{knowTargetRatio}%</Typography>
          )}
          <Typography>已记录生词{unknownWordsLength}个</Typography>
          <Typography>已记录熟词{knownWordsLength}个</Typography>
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
