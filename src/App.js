import "./App.css";
import Siderbar from "./components/siderbar/Siderbar";
import PostPage from "./pages/createPostPage/PostPage";
import AdminHomePages from "./pages/eventAdmin/AdminHomePages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import UpdatePage from "./pages/updatePostPage/UpdatePages";
import SchedulePage from "./pages/schedulePage/SchedulePage";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Siderbar />
        <div className="main">
          <Navbar />
          <Routes>
            <Route path="/" element={<AdminHomePages />} />
            <Route path="admin/pages/postPages" element={<PostPage />} />
            <Route path="admin/pages/updatePages" element={<UpdatePage />} />
            <Route path="admin/pages/schedulePages" element = {<SchedulePage/>} /> 
          </Routes>
        </div>
      </div>
      <div className="theme-toggle">
        <i className="fa-regular fa-moon"></i>
        <i className="fa-regular fa-sun"></i>
      </div>
    </Router>
  );
}

export default App;
