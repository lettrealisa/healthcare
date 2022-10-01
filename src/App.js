import { Route, Routes } from "react-router-dom";
import "./App.css";
import Alcohol from "./components/alcohol/Alcohol";
import SignIn from "./components/auth/SignIn";
import Food from "./components/food/Food";
import Glucose from "./components/glucose/Glucose";
import SignUpModal from "./components/SignUpModal";
import Steps from "./components/steps/Steps";

const fun = () => console.log("Test");
const test = () => console.log("Fun");

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <div className="App">
        <SignUpModal
          title="Вход"
          message="Нет аккаунта?"
          messageButton="Регистрация"
          fun={fun}
        />
        <Alcohol />
        <Glucose />
        <Steps />
        <Food />
        <SignIn />
      </div>
    </Routes>
  );
}

export default App;
