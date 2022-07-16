import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import SignUpModal from './components/SignUpModal'
import TextFieldModal from './components/TextFieldModal';
import Meals from './components/Meals';

const fun = () => console.log("Test")
const test = () => console.log("Fun")

function App() {
  return (
    <div className="App">
      <SignUp />
      <SignUpModal title="Вход" message="Нет аккаунта?" messageButton="Регистрация" fun={fun} />
      <Meals />
      <SignIn />
      <SignOut />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
