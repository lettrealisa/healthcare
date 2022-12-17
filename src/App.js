import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./features/admin/Dashboard";
import Alcohol from "./features/alcohol/Alcohol";
import SignIn from "./features/auth/SignIn";
import { FoodList } from "./features/food/FoodList";
import Glucose from "./features/glucose/Glucose";

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
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/food" element={<FoodList />} />
        <Route path="/alcohol" element={<Alcohol />} />
        <Route path="/glucose" element={<Glucose />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
