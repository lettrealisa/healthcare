import { MenuItem } from "@mui/material";

const characters = [{ name: "Cookie" }, { name: "Roger" }];
const Items = () => {
  return (
    <>
      {characters.map((c) => (
        <MenuItem key={c.name} value={c}>
          {c.name}
        </MenuItem>
      ))}
    </>
  );
};

export default Items;
