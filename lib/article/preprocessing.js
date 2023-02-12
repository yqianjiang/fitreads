import md5 from "js-md5";
import { format } from "date-fns";
import { tokenize } from "./tokenize.js";

/**
 * 预处理文章，输入文章内容（字符串content），返回数据库要保存的信息
 * @param {string} content
 */
export function preprocessing(content) {
  // 提取文章中所有的token
  // 给文章分段落、分句(数据库按句子存储，句子有句子id、所属段落id、所属文章id的信息供查询)
  const { title, totalWords, wordsUnique } = tokenize(content);

  // token去重，并取单词

  // 对出现的单词建立反向索引（具体到句）

  return {
    // 生成文章id
    id: md5(content),
    content,
    lastModified: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    category: "",
    title,
    totalWords,
    wordsUnique,
    // 反向索引表
  };
}
