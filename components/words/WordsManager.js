import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  addWordsToVocabulary,
  deleteWordsFromVocabulary,
} from "../../redux/slices/vocabularySlice";

import Alert from "../Alert";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WordList from "./WordList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function WordsManager() {
  const newWords = useSelector((state) => state.vocabulary.newWords);
  const familiarWords = useSelector((state) => state.vocabulary.familiarWords);
  const targetWords = useSelector((state) => state.vocabulary.targetWords);
  const dispatch = useDispatch();

  const [message, setMessage] = React.useState({ duration: 6000 });

  const addWordsTo = (vocabulary, words) => {
    dispatch(
      addWordsToVocabulary({
        words,
        vocabulary,
      })
    );
  };

  const removeWords = (vocabulary, words) => {
    dispatch(
      deleteWordsFromVocabulary({
        words,
        vocabulary,
      })
    );
  };

  const actions = {
    addToNew: (words) => {
      console.log("addToNew");
      removeWords("familiarWords", words);
      addWordsTo("newWords", words);
      setMessage({
        ...message,
        content: "操作成功",
        type: "success",
      });
    },
    addToFamiliar: (words) => {
      console.log("addToFamiliar");
      removeWords("newWords", words);
      addWordsTo("familiarWords", words);
      setMessage({
        ...message,
        content: "操作成功",
        type: "success",
      });
    },
    addToTarget: (words) => {
      addWordsTo("targetWords", words);
      setMessage({
        ...message,
        content: "操作成功",
        type: "success",
      });
    },
    removeFromTarget: (words) => {
      removeWords("targetWords", words);
      setMessage({
        ...message,
        content: "操作成功",
        type: "success",
      });
    },
  };

  const newWordActions = [
    {
      label: "移到熟词",
      callback: actions.addToFamiliar,
    },
    {
      label: "设为目标词",
      callback: actions.addToTarget,
    },
  ];

  const familiarWordActions = [
    {
      label: "移到生词",
      callback: actions.addToNew,
    },
    {
      label: "设为目标词",
      callback: actions.addToTarget,
    },
  ];

  const targetActions = [
    {
      label: "移除",
      callback: actions.removeFromTarget,
    },
    {
      label: "设为生词",
      callback: actions.addToNew,
    },
    {
      label: "设为熟词",
      callback: actions.addToFamiliar,
    },
  ];

  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Alert message={message} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="生词" {...a11yProps(0)} />
          <Tab label="熟词" {...a11yProps(1)} />
          <Tab label="目标词" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <WordList wordsDict={newWords} actions={newWordActions} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <WordList wordsDict={familiarWords} actions={familiarWordActions} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <WordList wordsDict={targetWords} actions={targetActions} />
      </TabPanel>
    </>
  );
}
