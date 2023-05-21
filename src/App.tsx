import "./App.css";
import Navbar from "./components/constants/Navbar";
import BlogsPage from "./pages/BlogsPage";
import DashBoardPage from "./pages/DashBoardPage";
import UserPostsPage from "./pages/UserPostsPage";
import UserSettingsPage from "./pages/UserSettingsPage";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <UserSettingsPage />
      </div>
    </>
  );
}

export default App;
