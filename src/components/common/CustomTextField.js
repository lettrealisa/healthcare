import { FormControl, TextField } from "@mui/material";

const CustomTextField = ({ label, type, value, setValue }) => {
  return (
    <FormControl variant="standard" fullWidth>
      <TextField
        id="outlined-basic"
        label={label}
        type={type}
        variant="outlined"
        value={value}
        onChange={setValue}
      />
    </FormControl>
  );
};

export default CustomTextField;
