import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Alcohol from "./components/alcohol/Alcohol.js";
import RequireAuth from "./components/auth/RequireAuth";
import SignIn from "./components/auth/SignIn";
import Food from "./components/food/Food";
import Glucose from "./components/glucose/Glucose";
import Profile from "./components/profile/Profile";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<SignIn />}></Route>

        <Route element={<RequireAuth />}>
          <Route path="/food" element={<Food />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/alcohol" element={<Alcohol />}></Route>
          <Route path="/glucose" element={<Glucose />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
