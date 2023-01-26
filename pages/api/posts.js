export default (req, res) => {
  res.status(200).json([
    {
      id: "1",
      date: "2023-01-01",
      title: "title1",
      contentHtml: "contentHtml",
    },
    {
      id: "2",
      date: "2023-01-02",
      title: "title2",
      contentHtml: "contentHtml",
    },
    {
      id: "3",
      date: "2023-01-03",
      title: "title3",
      contentHtml: "contentHtml",
    },
  ]);
};
