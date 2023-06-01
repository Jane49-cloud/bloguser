import "./App.css";
import Navbar from "./components/constants/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </div>
    </>
  );
}

export default App;
