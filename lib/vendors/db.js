import Dexie from "dexie";

export const db = new Dexie("fitReadsDB");

db.version(1).stores({
  dict: "word",
  articles: "id, title, category, lastModified",
});
