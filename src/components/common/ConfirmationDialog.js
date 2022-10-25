import { Dialog } from "@mui/material";
import { useState } from "react";

const ConfirmationDialog = () => {
  const [open, setOpen] = useState(false);
  return <Dialog open={open}>1</Dialog>;
};

export default ConfirmationDialog;
