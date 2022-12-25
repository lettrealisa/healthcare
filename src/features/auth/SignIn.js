import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../common/CustomButton";
import { CustomCheckbox } from "../../common/CustomCheckbox";
import { CustomTextField } from "../../common/CustomTextField";
import { useLoginMutation } from "../api/apiSlice";
import { setCredentials } from "./authSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Все права защищены © " + new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    email: "",
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

  const [login, { isLoading }] = useLoginMutation();

  const canSave = /*[email, password].every(Boolean) && */ !isLoading;

  const onSignInClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const res = await login({
          name: "Test",
          age: 45,
          job: "test",
          pet: "test",
          date: "2022-12-06T12:32",
          role: {
            name: "doctor",
          },
        }).unwrap();
        //setEmail("");
        //setPassword("");
        dispatch(setCredentials(res));
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.redhat.com/cms/managed-files/why-red-hat-illustration.svg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Вход
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => onSignInClicked(e)}
              sx={{ mt: 1 }}
            >
              <FormControl variant="outlined" fullWidth>
                <CustomTextField type="email" id="email" label="Email" />
              </FormControl>
              <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
                <CustomTextField id="password" label="Пароль" type="password" />
              </FormControl>
              <FormControlLabel
                control={<CustomCheckbox value="remember" color="primary" />}
                label="Запомнить меня?"
              />
              <CustomButton type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                Вход
              </CustomButton>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Забыли пароль?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Нет аккаунта? Создать аккаунт"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
