import React from 'react';
import PropTypes from 'prop-types';
import { Box, LinearProgress, Typography } from '@mui/material';

/**
 * 显示测试进度的组件
 * @param {Object} props 组件参数
 * @param {number} props.minTestCount 至少要完成几个单词
 * @param {Array} props.history 答题历史记录
 * @returns {JSX.Element} ProgressBar组件
 */
function ProgressBar(props) {
  const { minTestCount, history } = props;
  const progress = (history.length / minTestCount) * 100;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
}

// ProgressBar.propTypes = {
//   level: PropTypes.number.isRequired,
//   history: PropTypes.arrayOf(PropTypes.bool).isRequired,
// };

export default ProgressBar;
