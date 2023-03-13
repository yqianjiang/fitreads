import React, { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * 用户回答题目的表单
 * @param {Object} props 组件参数
 * @param {Array} props.options 问题选项
 * @param {Function} props.onSubmit 回答提交回调函数
 * @returns {JSX.Element} AnswerForm组件
 */
function AnswerForm(props) {
  const { options, onSubmit } = props;
  const [selectedOption, setSelectedOption] = useState(null);

  /**
   * 选项变化处理函数
   * @param {React.ChangeEvent<HTMLInputElement>} event 选项变化事件
   */
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  /**
   * 回答提交处理函数
   */
  const handleSubmit = () => {
    onSubmit(selectedOption);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">请选择正确答案</FormLabel>
      <RadioGroup value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
          ))}
          <FormControlLabel
            key={"不认识"}
            value={"不认识"}
            control={<Radio />}
            label={"不认识"}
          />
      </RadioGroup>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
        <Button variant="contained" onClick={handleSubmit}>下一题</Button>
        <Button disabled={!props.showFinish} variant="contained" onClick={props.onFinish}>完成</Button>
      </Box>
    </FormControl>
  );
}

AnswerForm.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AnswerForm;
