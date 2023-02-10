import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  addWordsToVocabulary,
  deleteWordsFromVocabulary,
} from "../../redux/slices/vocabularySlice";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function WordsManager() {
  const unknownWords = useSelector((state) => state.vocabulary.unknownWords);
  const knownWords = useSelector((state) => state.vocabulary.knownWords);
  const targetWords = useSelector((state) => state.vocabulary.targetWords);
  const dispatch = useDispatch();

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
    addToUnknown: (words) => {
      console.log("addToUnknown");
      removeWords("knownWords", words);
      addWordsTo("unknownWords", words);
    },
    addToKnown: (words) => {
      console.log("addToKnown");
      removeWords("unknownWords", words);
      addWordsTo("knownWords", words);
    },
    addToTarget: (words) => addWordsTo("targetWords", words),
    removeFromTarget: (words) => removeWords("targetWords", words),
  };

  const unknownActions = [
    {
      label: "移到熟词",
      callback: actions.addToKnown,
    },
    {
      label: "设为目标词",
      callback: actions.addToTarget,
    },
  ];

  const knownActions = [
    {
      label: "移到生词",
      callback: actions.addToUnknown,
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
      callback: actions.addToUnknown,
    },
    {
      label: "设为熟词",
      callback: actions.addToKnown,
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
        <WordList wordsDict={unknownWords} actions={unknownActions} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <WordList wordsDict={knownWords} actions={knownActions} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <WordList wordsDict={targetWords} actions={targetActions} />
      </TabPanel>
    </>
  );
}
