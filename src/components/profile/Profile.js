import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import useClient from "../auth/useClient";
import CustomButton from "../common/CustomButton";
import CustomTextField from "../common/CustomTextField";
import Header from "../common/Header";

const Profile = () => {
  const characters = [
    { id: 1, name: "Cookie" },
    { id: 2, name: "Roger" },
  ];

  const [value, setValue] = useState(characters[0].name);
  const [email, setEmail] = useState("");
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onValueChange = (e) => {
    setValue(e.target.value);
  };

  const { account, teams } = useClient();

  const sendInvite = async () => {
    await teams.createMembership(
      "",
      email,
      [].push(value),
      "http://localhost:3000"
    );
  };

  return (
    <>
      <Header label="Личный кабинет" />
      <FormControl fullWidth>
        <InputLabel id="label">Роль</InputLabel>
        <Select
          labelId="label"
          label="Роль"
          value={value}
          onChange={onValueChange}
        >
          <MenuItem value="">
            <em>-</em>
          </MenuItem>
          {characters.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CustomTextField
        label="Значение"
        type="email"
        value={email}
        setValue={onEmailChange}
      />
      <CustomButton onClick={sendInvite} label="Пригласить" />
    </>
  );
};

export default Profile;
