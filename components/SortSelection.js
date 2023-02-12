import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";

export default function SortMethodSelection({
  selectedOrder,
  setSelectedOrder,
  isDescending,
  setIsDescending,
  options,
}) {
  const handleChangeOrder = (e) => {
    setSelectedOrder(e.target.value);
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="sort-method-selection">排序</InputLabel>
        <Select
          value={selectedOrder}
          onChange={handleChangeOrder}
          input={<OutlinedInput label="排序" id="sort-method-selection" />}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            checked={isDescending}
            onChange={(e) => setIsDescending(e.target.checked)}
            name="descending"
          />
        }
        label="倒序"
        labelPlacement="start"
      />
    </>
  );
}
