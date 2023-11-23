import * as React from "react";
import List from "@mui/material/List";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function LazyList({ data, renderRow }) {
  const numItemsPerPage = 15;
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={1} pt={2}>
      <Pagination
        count={Math.ceil(data.length / numItemsPerPage)}
        page={page}
        onChange={handleChange}
      />
      <List>
        {data
          .slice((page - 1) * numItemsPerPage, page * numItemsPerPage)
          .map((item, index) => renderRow({ item, index }))}
      </List>
    </Stack>
  );
}
