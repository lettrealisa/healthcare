import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import useAuth from "./useAuth";
import useClient from "./useClient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const SignIn = () => {
  const { setUser, setRoles, members, setMembers, rememberMe, setRememberMe } =
    useAuth();
  const { account, teams } = useClient();

  const toggleRememberMe = () => {
    setRememberMe((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await account.createEmailSession(values.username, values.password);

    const roles = await teams.list();

    roles.teams.forEach(async (role) => {
      setMembers(await teams.getMemberships(role.$id));
    });

    /*const user = await account.get();
    setUser(user);

    if (rememberMe) {
      localStorage.setItem("roles", roles);
      localStorage.setItem("user", user);
    }*/
    console.log(members);
  };

  const [values, setValues] = React.useState({
    username: "",
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ backgroundColor: "var(--soft)" }}>
      <Box sx={style}>
        <Box sx={{ display: "flex", marginBottom: "1rem" }}>
          <Typography id="modal-modal-title">
            <h2>Вход</h2>
          </Typography>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs="12">
            <FormControl
              variant="standard"
              fullWidth
              sx={{ marginBottom: "0.5rem" }}
            >
              <TextField
                id="outlined-basic"
                label="Логин"
                variant="outlined"
                value={values.username}
                onChange={handleChange("username")}
              />
            </FormControl>
          </Grid>
          <Grid item xs="12">
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Пароль
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>
          <Grid item xs="12">
            <FormControlLabel
              control={
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={toggleRememberMe}
                ></Checkbox>
              }
              label="Запомнить меня?"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
            className="bg-primary"
            onClick={(e) => handleLogin(e)}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
