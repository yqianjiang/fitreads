import Snackbar from "@mui/material/Snackbar";
import MUIAlert from "@mui/material/Alert";
import { useState, useEffect } from "react";

export default function Alert({ message }) {
  const [open, setOpen] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // 当父组件setMessage，则打开
  useEffect(() => {
    if (message?.content) {
      setOpen(true);
    }
  }, [message]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={message?.duration || 6000}
      onClose={handleCloseSnackbar}
    >
      <MUIAlert severity={message?.type || "info"}>
        {message?.content || ""}
      </MUIAlert>
    </Snackbar>
  );
}
