import { Visibility, VisibilityOff } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useAuth } from "../../context/AuthProvider";

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

const SignInModal = () => {
  const { setAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const api = `http://localhost:12012/login`;
    const res = await axios.post(api, {
      username: values.username,
      password: values.password,
    });
    const data = await res.data;

    const token = data["token"];

    setAuth({ token });

    if (data) {
      console.log(data);
    }
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddCircleIcon
          className="addCircleIcon"
          sx={{ transform: "scale(1.3)", marginTop: "0.5rem" }}
          onClick={handleOpen}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs="12">
              <FormControlLabel
                control={<Checkbox id="rememberMe"></Checkbox>}
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
      </Modal>
    </div>
  );
};

export default SignInModal;
