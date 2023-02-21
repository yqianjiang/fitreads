import * as React from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

import SortSelection from "../SortSelection";
import LazyList from "../LazyList";
import Date from "../Date";
import Link from "../Link";
import WordsManager from "../words/WordsManager";
import { sortArticles, sortArticlesOptions } from "./lib/sortArticles";

function renderRow({
  item,
  index,
  handleClickArticle,
  editMode,
  selectedArticles,
  showStats,
  drawerState,
  toggleDrawer,
  ...props
}) {
  const {
    id,
    lastModified,
    title,
    category,
    wordsUnique,
    totalWords,
    ...rest
  } = item;
  console.log(rest);
  const labelId = `${id}`;

  return (
    <React.Fragment key={id}>
      <ListItem
        disablePadding
        {...props}
        secondaryAction={
          wordsUnique && (
            <Button onClick={toggleDrawer(true)} sx={{ ml: 1 }}>
              词表
            </Button>
          )
        }
        sx={{
          "& .MuiListItemSecondaryAction-root": {
            right: 0,
          },
        }}
      >
        <ListItemButton role={undefined} onClick={handleClickArticle(id)} dense>
          {editMode && (
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedArticles.indexOf(id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
          )}
          <ListItemText
            id={id}
            primary={
              <>
                {title}
                {category && (
                  <Chip size="small" label={category} sx={{ ml: 1 }} />
                )}
              </>
            }
            secondary={
              <>
                {showStats && (
                  <Box component="span" sx={{ display: "block" }}>
                    {totalWords}词 - {"xx"}%目标词 {"xx"}%未标记 {"xx"}生词
                  </Box>
                )}
                <Date dateString={lastModified} />
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Drawer
        anchor={"bottom"}
        open={drawerState}
        onClose={toggleDrawer(false)}
      >
        <Paper sx={{ height: 400 }}>
          <WordsManager wordsFilter={wordsUnique} fixed={true} />
        </Paper>
      </Drawer>
      <Divider component="li" />
    </React.Fragment>
  );
}

export default function ArticleList({ articlesDict, actions }) {
  const [editMode, setEditMode] = React.useState(false);
  const [selectedArticles, setSelectedArticles] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState("lastModified");
  const [isDescending, setIsDescending] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);
  const [showStats, setHideTranslation] = React.useState(false);
  const router = useRouter();

  const handleChangeShowStats = () => {
    setHideTranslation(!showStats);
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(articles.map(({ article }) => article));
    }
    setCheckAll(!checkAll);
  };

  const handleClickArticle = (id) => () => {
    if (editMode) {
      toggleCheck(id);
    } else {
      // 跳转文章页面
      router.push("/articles/" + id);
    }
  };

  const toggleCheck = (value) => {
    const currentIndex = selectedArticles.indexOf(value);
    const newChecked = [...selectedArticles];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedArticles(newChecked);

    if (newChecked.length === articles.length) {
      setCheckAll(true);
    }
    if (!newChecked.length) {
      setCheckAll(false);
    }
  };

  const onSubmit = (callback) => {
    const payload = [];
    for (const article of selectedArticles) {
      payload.push(articlesDict[article]);
    }
    callback(payload);
  };

  const articles = React.useMemo(
    () => sortArticles(articlesDict, selectedOrder, isDescending),
    [articlesDict, selectedOrder, isDescending]
  );

  const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap={"wrap"}>
        <SortSelection
          {...{
            selectedOrder,
            setSelectedOrder,
            isDescending,
            setIsDescending,
            options: sortArticlesOptions,
          }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={showStats}
              onChange={handleChangeShowStats}
              inputProps={{ "aria-label": "switch-show-stats" }}
            />
          }
          label="显示统计"
          labelPlacement="start"
        />
        <Typography>共{articles.length}篇</Typography>
      </Stack>
      {editMode && (
        <Checkbox
          checked={checkAll}
          onChange={handleCheckAll}
          inputProps={{ "aria-label": "checkAll" }}
        />
      )}
      <Button onClick={() => setEditMode(!editMode)}>
        {editMode ? "退出编辑" : "编辑"}
      </Button>
      {editMode && (
        <>
          {actions?.map((action) => (
            <Button
              key={action.label}
              onClick={() => onSubmit(action.callback)}
            >
              {action.label}
            </Button>
          ))}
        </>
      )}
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <LazyList
          data={articles}
          renderRow={(props) =>
            renderRow({
              handleClickArticle,
              editMode,
              selectedArticles,
              showStats,
              drawerState,
              toggleDrawer,
              ...props,
            })
          }
        ></LazyList>
      </Box>
    </>
  );
}
