import { getLocal, setLocal } from "../stores";

export const getCategories = async () => {
  const categories = await getLocal("categories");
  return categories;
};

export const saveCategories = async (arr) => {
  await setLocal("categories", arr);
};
