import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Alcohol from "./components/alcohol/Alcohol.js";
import SignIn from "./components/auth/SignIn";
import Header from "./components/common/Header";
import Food from "./components/food/Food";
import Glucose from "./components/glucose/Glucose";
import Profile from "./components/profile/Profile";
import Steps from "./components/steps/Steps";

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
        <Route
          path="/"
          element={
            <>
              <Header label="Healthcare" />
              <Glucose />
              <Steps />
              <Food />
            </>
          }
        ></Route>
        <Route path="/food" element={<Food />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/alcohol" element={<Alcohol />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
