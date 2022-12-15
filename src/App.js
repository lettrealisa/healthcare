import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Alcohol from "./features/alcohol/Alcohol";
import SignIn from "./features/auth/SignIn";
import { FoodList } from "./features/food/FoodList";

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
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/food" element={<FoodList />} />
        <Route path="/alcohol" element={<Alcohol />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
