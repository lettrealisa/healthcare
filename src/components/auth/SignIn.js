import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
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

const ColorButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${pink[600]}`,
  background: pink[600],
  color: "#fff",
  "&:hover": {
    border: `1px solid ${pink[600]}`,
    background: "#fff",
    color: pink[600],
  },
  "&:disabled": {
    border: `1px solid ${pink[300]}`,
    background: pink[300],
    color: pink[50],
  },
}));

const ColorCheckbox = styled(Checkbox)(({ theme }) => ({
  color: pink[600],
  "&.Mui-checked": {
    color: pink[600],
  },
}));

const ColorInput = styled(Input)(({ theme }) => ({
  "&:hover": {
    color: pink[600],
  },
}));

const SignIn = () => {
  const { setIsLoggedIn, rememberMe, setRememberMe } = useAuth();
  const { account } = useClient();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await account.createEmailSession(values.username, values.password);
    setIsLoggedIn(true);

    navigate("/food");
  };

  const toggleRememberMe = () => {
    setRememberMe((prev) => !prev);
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
                label="Email"
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
              control={<ColorCheckbox id="rememberMe" />}
              label="Запомнить меня?"
              onChange={toggleRememberMe}
              checked={rememberMe}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <ColorButton variant="contained" fullWidth onClick={handleLogin}>
            Войти
          </ColorButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
