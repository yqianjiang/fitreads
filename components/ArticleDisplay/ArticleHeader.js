import React from "react";
import Date from "../Date";
import utilStyles from "../../styles/utils.module.css";
import Chip from "@mui/material/Chip";

const ArticleHeader = ({ title, date, data, ...article }) => {
  return (
    <section>
      <h1 className={utilStyles.headingXl}>{title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={date} />
      </div>
      {article&&data ? (
        <>
          <Chip color="primary" variant="outlined" label={article.tag} />
          <div class="stats-info">
            {`共${article.totalWords}词，生词率${(
              (data.unknownWord.length / article.wordsUnique.length) *
              100
            ).toFixed(2)}%，目标词率${(
              (data.targetWord.length / article.wordsUnique.length) *
              100
            ).toFixed(2)}%`}
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
};
export default ArticleHeader;
