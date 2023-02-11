import React from "react";

import Layout from "../../components/Layout";
import WordsAdder from "../../components/words/WordsAdder";
import WordsManager from "../../components/words/WordsManager";

import NoSsr from "@mui/material/NoSsr";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const WordListPage = () => {
  return (
    <Layout pageName="词表管理">
      <Box sx={{ mb: 3 }}>
        <WordsAdder />
      </Box>
      <Divider />
      <NoSsr>
        <WordsManager />
      </NoSsr>
    </Layout>
  );
};

export default WordListPage;
