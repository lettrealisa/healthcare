import { Route, Routes } from "react-router-dom";
import "./App.css";
import Alcohol from "./components/alcohol/Alcohol";
import RequireAuth from "./components/auth/RequireAuth";
import SignIn from "./components/auth/SignIn";
import Header from "./components/common/Header";
import Food from "./components/food/Food";
import Glucose from "./components/glucose/Glucose";
import Profile from "./components/profile/Profile";
import Steps from "./components/steps/Steps";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route
        path="/"
        element={
          <>
            <Header label="Healthcare" />
            <Alcohol />
            <Glucose />
            <Steps />
            <Food />
          </>
        }
      ></Route>
      <Route path="/" element={<RequireAuth rolesList={["patient"]} />}>
        <Route path="/food" element={<Food />}></Route>
      </Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
