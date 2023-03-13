import { Stack } from '@mui/material';
import React from 'react';

function TestResult({ statistics, showDetail, level }) {
  return (
    <div>
      {showDetail && <h2>测试结果: 等级 {level}</h2>}
      <Stack direction={'row'} gap={2}>
        <p>预估词汇量: {statistics.estimatedVocabulary ?? '-'}</p>
        <p>预估误差: {statistics.estimatedError ?? '-'}</p>
      </Stack>
      {showDetail && Object.entries(statistics.levels).map(([level, stats]) => (
        <div key={level}>
          <h3>等级 {level}</h3>
          <p>正确率: {(stats.accuracy * 100).toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );
}

export default TestResult;
