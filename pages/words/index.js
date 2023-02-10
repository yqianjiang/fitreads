import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import WordStats from "../../components/words/WordStats";
import NoSsr from "@mui/material/NoSsr";
import Link from "../../components/Link";

const WordsPage = () => {
  return (
    <Layout pageName="词汇">
      <NoSsr>
        <WordStats></WordStats>
      </NoSsr>
      {/* 词汇管理入口 */}
      <Link href="/word-list">词汇管理</Link>
    </Layout>
  );
};

export default WordsPage;
