import md5 from "js-md5";

/**
 * 预处理文章，输入文章内容（字符串content），返回数据库要保存的信息
 * @param {string} content 
 */
export function preprocessing(content) {
  // 提取文章中所有的token
  // 给文章分段落、分句

  // token去重，并取单词

  // 对出现的单词建立反向索引（具体到句）

  // 生成文章id

  return {
    uuid: md5(content),
    content,
    // 反向索引表
  }
}