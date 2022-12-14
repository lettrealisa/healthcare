import { FormControl, InputLabel, Select } from "@mui/material";
import Items from "./Items";

const CustomSelect = ({ label, value, setValue, items }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label={label}
        fullWidth
        value={value}
        onChange={setValue}
      >
        <Items />
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
