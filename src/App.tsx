import "./App.css";
import Navbar from "./components/constants/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Loader from "./Custom/CustomLoader";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector((state: any) => state.loaders);
  return (
    <>
      <div>
        {loading && <Loader />}
        <ToastContainer />
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </div>
    </>
  );
}

export default App;
