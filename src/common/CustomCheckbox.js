import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const CustomCheckbox = styled(Checkbox)(() => ({
  color: pink[600],
  "&.Mui-checked": {
    color: pink[600],
  },
}));
