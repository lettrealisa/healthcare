import { grey, pink } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: grey[500],
  },
  "& input:valid + fieldset": {
    color: grey[500],
    borderColor: grey[300],
    borderWidth: 2,
  },
  "& input:valid:hover + fieldset": {
    borderColor: pink[600],
  },
  "& input:valid:focus + fieldset": {
    borderColor: pink[600],
    borderLeftWidth: 6,
    padding: "4px !important",
  },
});
