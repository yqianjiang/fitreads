import React, { useEffect, useState } from "react";

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
      {value === index && <Box sx={{ mt: '48px', pt: 2 }}>{children}</Box>}
    </div>
  );
}

/**
 * wordsFilter: word[], 要展示的单词列表，作为filter，仅展示这些单词
 */
export default function WordsManager({ wordsFilter, fixed }) {
  const newWordsDict = useSelector((state) => state.vocabulary.newWords);
  const familiarWordsDict = useSelector(
    (state) => state.vocabulary.familiarWords
  );
  const targetWordsDict = useSelector((state) => state.vocabulary.targetWords);

  const [allWordDict, setAllWordDict] = useState({
    newWords: {},
    familiarWords: {},
    unseenWords: {},
    targetWords: {},
  });

  useEffect(() => {
    if (!wordsFilter) return;
    const newWords = {};
    const familiarWords = {};
    const unseenWords = {};
    const targetWords = {};
    for (const word of wordsFilter) {
      if (word in newWordsDict) {
        newWords[word] = newWordsDict[word];
      } else if (word in familiarWordsDict) {
        familiarWords[word] = familiarWordsDict[word];
      } else {
        unseenWords[word] = { word };
      }

      if (word in targetWordsDict) {
        targetWords[word] = targetWordsDict[word];
      }
    }
    setAllWordDict({
      newWords,
      familiarWords,
      unseenWords,
      targetWords,
    });
  }, [newWordsDict, wordsFilter]);

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
      label: "标为目标词",
      callback: actions.addToTarget,
    },
  ];

  const familiarWordActions = [
    {
      label: "移到生词",
      callback: actions.addToNew,
    },
    {
      label: "标为目标词",
      callback: actions.addToTarget,
    },
  ];

  const unseenWordActions = [
    {
      label: "标为生词",
      callback: actions.addToNew,
    },
    {
      label: "标为熟词",
      callback: actions.addToFamiliar,
    },
    {
      label: "标为目标词",
      callback: actions.addToTarget,
    },
  ];

  const targetActions = [
    {
      label: "移出目标词表",
      callback: actions.removeFromTarget,
    },
    {
      label: "标为生词",
      callback: actions.addToNew,
    },
    {
      label: "标为熟词",
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
      <Box sx={{ width: '100%', borderBottom: 1, borderTop: 1, borderColor: "divider", position: fixed ? "fixed" : "static", height: 48, bgcolor: "background.paper", zIndex: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="生词" {...a11yProps(0)} />
          <Tab label="熟词" {...a11yProps(1)} />
          <Tab label="目标词" {...a11yProps(2)} />
          {wordsFilter && <Tab label="未标记词" {...a11yProps(3)} />}
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <WordList
          wordsDict={wordsFilter ? allWordDict.newWords : newWordsDict}
          actions={newWordActions}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <WordList
          wordsDict={
            wordsFilter ? allWordDict.familiarWords : familiarWordsDict
          }
          actions={familiarWordActions}
        />
      </TabPanel>
      {wordsFilter && (
        <TabPanel value={activeTab} index={3}>
          <WordList
            wordsDict={allWordDict.unseenWords}
            actions={unseenWordActions}
          />
        </TabPanel>
      )}
      <TabPanel value={activeTab} index={2}>
        <WordList
          wordsDict={wordsFilter ? allWordDict.targetWords : targetWordsDict}
          actions={targetActions}
        />
      </TabPanel>
    </>
  );
}
