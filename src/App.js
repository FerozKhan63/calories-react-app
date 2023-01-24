import logo from "./logo.svg";
import "./App.css";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Home from "./components/Home";
import Registration from "./components/Registration";
import UserProfile from "./components/UserProfile";
import RouterSetup from "./components/RouterSetup";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <RouterSetup />
    </div>
  );
}

export default App;
