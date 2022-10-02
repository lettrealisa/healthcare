import { Route, Routes } from "react-router-dom";
import "./App.css";
import Alcohol from "./components/alcohol/Alcohol";
import RequireAuth from "./components/auth/RequireAuth";
import SignIn from "./components/auth/SignIn";
import Food from "./components/food/Food";
import Glucose from "./components/glucose/Glucose";
import Steps from "./components/steps/Steps";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route
        path="/"
        element={
          <>
            <Alcohol />
            <Glucose />
            <Steps />
            <Food />
          </>
        }
      ></Route>
      <Route path="/" element={<RequireAuth roles={["patient"]} />}>
        <Route path="/food" element={<Food />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
