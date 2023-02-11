import * as React from "react";
import { findLemma } from "../../lib/lemmatize";
import styles from "./article.module.scss";
import clsx from "clsx";

const ArticleBody = ({
  // 要展示的文章内容
  paragraphs,

  // 辅助高亮的数据
  unseenWord,
  newWord,
  targetWord,
  translations,

  // 切换显示模式
  mode,
  highlightList,

  // handle点击单词的交互
  toggleTrans,
  toggleFamiliar,
}) => {
  const computeTranslation = (token) => {
    // function to compute translation of token
    token = findLemma(token);
    const trans = translations[token]?.translation
      ?.split(".")[1]
      ?.split(",")[0]
      ?.split("\\")[0];
    return mode.showTrans && trans ? `${trans.trim()}` : "";
  };

  const onClickWord = async (e) => {
    let token = e.target?.getAttribute("data-token");
    if (!token) return;
    token = findLemma(token);

    if (mode.markNewWord) {
      toggleFamiliar(token);
    } else if (mode.showTrans) {
      toggleTrans(token);
    }
  };

  // 判断该token后方是否加空格
  const checkPadding = (sentence, idx) => {
    const currToken = sentence.tokens[idx];
    const nextToken = sentence.tokens[idx + 1];

    const notationList = ["(", "'", "‘"];

    if (nextToken === "-") return true;
    if (notationList.includes(currToken)) return false;
    if (notationList.includes(nextToken)) return true;

    // 后方连接单词需要加空格
    if (/\w/.test(nextToken)) return true;

    return false;
  };

  return (
    <article className={styles.article}>
      {paragraphs.map((paragraph, idx) => {
        return (
          <p key={`paragraph${idx}`}>
            {paragraph.map((sentence, idx) => {
              return (
                <React.Fragment key={sentence.sentence.slice(0, 5) + idx}>
                  <span
                    className={styles["origin-sentence"]}
                    onClick={onClickWord}
                  >
                    {sentence.tokens.map((token, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <span
                            data-token={token}
                            className={clsx([
                              styles.token,
                              highlightList.includes("unseen") &&
                              unseenWord.includes(findLemma(token))
                                ? styles['token--unseen']
                                : null,
                              highlightList.includes("newWord") &&
                              newWord.includes(findLemma(token))
                                ? styles['token--new-word']
                                : null,
                              highlightList.includes("target") &&
                              !targetWord.includes(findLemma(token))
                                ? styles['token--ignore']
                                : null,
                            ])}
                          >
                            {computeTranslation(token) ? (
                              <ruby>
                                {token}
                                <rt>{computeTranslation(token)}</rt>
                              </ruby>
                            ) : (
                              token
                            )}
                          </span>
                          {/* 若下一个词是标点符号，则不必了显示空格了。 */}
                          {checkPadding(sentence, idx) ? <span> </span> : ""}
                        </React.Fragment>
                      );
                    })}
                  </span>
                  <span
                    className={styles["translate-sentence"]}
                    style={{
                      display: mode.showSentenceTrans ? "block" : "none",
                    }}
                  >
                    {sentence.translation}
                  </span>
                </React.Fragment>
              );
            })}
          </p>
        );
      })}
    </article>
  );
};

export default ArticleBody;
