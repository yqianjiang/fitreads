import React from "react";
import NoSsr from "@mui/material/NoSsr";
import { Button } from "@mui/material";

import Layout from "../../components/Layout";
import WordStats from "../../components/words/WordStats";
import { NextLinkComposed } from "../../components/Link";

import {
  downloadDictionary,
  downloadCommonDictionary,
} from "../../lib/api/dict";
import { getLocal, setLocal } from "../../lib/stores";
import { dictionaryNameMap } from "../../lib/constants";

const WordsPage = () => {
  const [localDicts, setLocalDicts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleDownloadDictionary = async (dictionary) => {
    setLoading(true);

    const words = await downloadDictionary({ dictionary });
    // 把words保存到本地
    setLocal(dictionary, words);
    const newLocalDicts = [...localDicts, dictionary];
    setLocalDicts(newLocalDicts);
    setLocal("localDicts", newLocalDicts);

    setLoading(false);
  };

  const handleDownloadCommonDictionary = async () => {
    setLoading(true);
    await downloadCommonDictionary();
    setLoading(false);
  };

  React.useEffect(() => {
    setLocalDicts(getLocal("localDicts"));
  }, []);

  return (
    <Layout pageName="词汇">
      <NoSsr>
        <WordStats localDicts={localDicts}></WordStats>
      </NoSsr>
      <Button onClick={handleDownloadCommonDictionary}>下载离线词典</Button>
      {Object.keys(dictionaryNameMap).map((x) => {
        if (!localDicts.includes(x)) {
          return (
            <Button key={x} onClick={() => handleDownloadDictionary(x)}>
              下载{dictionaryNameMap[x]}单词书
            </Button>
          );
        }
      })}
      <div>
        <Button
          variant="contained"
          component={NextLinkComposed}
          sx={{ mt: 2 }}
          to={{
            pathname: "/word-list/",
          }}
        >
          词汇管理
        </Button>
      </div>
    </Layout>
  );
};

export default WordsPage;
