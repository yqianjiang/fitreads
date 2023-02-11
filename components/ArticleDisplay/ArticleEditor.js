import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getCategories, saveCategories } from "../../lib/api/categories";

export default function ArticleEditor({ title, category, onEditArticle }) {
  const [open, setOpen] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState(category);
  const [categoryOptions, setCategoryOptions] = React.useState([]);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newOption, setNewOption] = React.useState();

  React.useEffect(() => {
    const loadCategories = async () => {
      const _categoryOptions = (await getCategories()) || [];
      setCategoryOptions(_categoryOptions);
    };
    loadCategories();
  }, []);

  const handleAddNewOption = () => {
    const newVal = [...categoryOptions, newOption];
    setCategoryOptions(newVal);
    saveCategories(newVal);
    setNewOption("");
  };

  const handleChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleSave = (event, reason) => {
    handleClose(event, reason);
    onEditArticle({ title: newTitle, category: newCategory });
  };

  return (
    <div>
      <Button variant="outlined" sx={{mb: 1}} onClick={handleClickOpen}>编辑文章信息</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>编辑文章信息</DialogTitle>
        <DialogContent>
          <Stack component="form">
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <TextField
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                multiline
                label="标题"
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="category-select-label">类别</InputLabel>
              <Select
                labelId="category-select-label"
                value={newCategory}
                onChange={handleChange}
                input={<OutlinedInput label="类别" />}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
                <MenuItem>
                  <Divider />
                  <TextField
                    onChange={(e) => setNewOption(e.target.value)}
                    variant="outlined"
                    placeholder="输入新类别"
                    size="small"
                  />
                  <Button onClick={handleAddNewOption}>添加</Button>
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSave}>保存</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
