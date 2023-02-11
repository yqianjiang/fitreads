import React from "react";
import Date from "../Date";
import utilStyles from "../../styles/utils.module.css";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const ArticleHeader = ({ title, data, category, ...article }) => {
  return (
    <section>
      <Typography variant="h4" component="h1">{title}</Typography>
      <div className={utilStyles.lightText}>
        <Date dateString={article.lastModified} />
      </div>
      {article && data ? (
        <>
          {category && (
            <Chip
              color="primary"
              variant="outlined"
              label={category}
              sx={{ my: 1 }}
            />
          )}
          <div className="stats-info">
            {`共${article.totalWords}词，生词率${(
              (data.newWord.length / article.wordsUnique.length) *
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
