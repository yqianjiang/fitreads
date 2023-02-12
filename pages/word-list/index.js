import React, { useMemo } from "react";

import Layout from "../../components/Layout";
import WordsAdder from "../../components/words/WordsAdder";
import WordsManager from "../../components/words/WordsManager";

import { useSelector } from "react-redux";

import NoSsr from "@mui/material/NoSsr";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const WordListPage = () => {
  const newWords = useSelector((state) => state.vocabulary.newWords);
  const familiarWords = useSelector((state) => state.vocabulary.familiarWords);
  const targetWords = useSelector((state) => state.vocabulary.targetWords);

  const getExportLink = (data) =>
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));

  const exportLinkSimple = useMemo(() => {
    const data = {};
    if (newWords) {
      data.newWords = Object.keys(newWords);
    }
    if (familiarWords) {
      data.familiarWords = Object.keys(familiarWords);
    }
    if (targetWords) {
      data.targetWords = Object.keys(targetWords);
    }
    return getExportLink(data);
  }, [newWords, familiarWords, targetWords]);

  const exportLinkAll = useMemo(() => {
    const data = {};
    if (newWords) {
      data.newWords = Object.values(newWords);
    }
    if (familiarWords) {
      data.familiarWords = Object.values(familiarWords);
    }
    if (targetWords) {
      data.targetWords = Object.values(targetWords);
    }
    return getExportLink(data);
  }, [newWords, familiarWords, targetWords]);

  return (
    <Layout pageName="词表管理">
      <Stack
        sx={{
          pb: 3,
        }}
        direction={{
          sm: "row",
          xs: "column",
        }}
        spacing={1}
      >
        <WordsAdder />
        <a download="myVocabulary.json" href={exportLinkSimple}>
          <Button variant="outlined" sx={{ width: "100%" }}>
            导出词表
          </Button>
        </a>
        <a download="myVocabulary.json" href={exportLinkAll}>
          <Button variant="outlined" sx={{ width: "100%" }}>
            导出词表（包含详细信息）
          </Button>
        </a>
      </Stack>
      <Divider />
      <NoSsr>
        <WordsManager />
      </NoSsr>
    </Layout>
  );
};

export default WordListPage;
