import React from "react";
import Layout from "../../components/Layout";
import WordStats from "../../components/words/WordStats";
import NoSsr from "@mui/material/NoSsr";
import Link from "../../components/Link";
import { downloadDictionary } from "../../lib/api/dict";
import { Button } from "@mui/material";

const WordsPage = () => {
  return (
    <Layout pageName="词汇">
      <NoSsr>
        <WordStats></WordStats>
      </NoSsr>
      {/* <Button onClick={() => downloadDictionary({ dictionary: "xx" })}>
        下载小学单词书
      </Button>
      <Button onClick={() => downloadDictionary({ dictionary: "zk" })}>
        下载初中单词书
      </Button> */}
      <Button onClick={() => downloadDictionary({ dictionary: "gk" })}>
        下载高中单词书
      </Button>
      <Button onClick={() => downloadDictionary({ dictionary: "cet4" })}>
        下载四级单词书
      </Button>
      <Button onClick={() => downloadDictionary({ dictionary: "cet6" })}>
        下载六级单词书
      </Button>
      <Button onClick={() => downloadDictionary({ dictionary: "ky" })}>
        下载考研单词书
      </Button>
      <Button onClick={() => downloadDictionary({ dictionary: "ielts" })}>
        下载雅思单词书
      </Button>
      <Button onClick={() => downloadDictionary({ dictionary: "toefl" })}>
        下载托福单词书
      </Button>
      <Button onClick={() => downloadDictionary({ dictionary: "cet8" })}>
        下载专八单词书
      </Button>
      <Button onClick={() => downloadDictionary({ dictionary: "GRE" })}>
        下载GRE单词书
      </Button>
      {/* 词汇管理入口 */}
      <div>
        <Link href="/word-list">词汇管理</Link>
      </div>
    </Layout>
  );
};

export default WordsPage;
