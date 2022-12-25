import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import store from "./app/store";
import Dashboard from "./features/admin/Dashboard";
import Alcohol from "./features/alcohol/Alcohol";
import { useLoginMutation } from "./features/api/apiSlice";
import SignIn from "./features/auth/SignIn";
import { FoodList } from "./features/food/FoodList";
import Glucose from "./features/glucose/Glucose";
import ProtectedRoute from "./features/router/ProtectedRoute";

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
  const {
    data: auth,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useLoginMutation();
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/food"
          element={
            <ProtectedRoute isAllowed={1 === 1 || store.getState().auth.user}>
              <FoodList />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/alcohol" element={<Alcohol />} />
        <Route path="/glucose" element={<Glucose />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
