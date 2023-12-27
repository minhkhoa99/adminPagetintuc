import "./App.css";
import Siderbar from "./components/siderbar/Siderbar";
import PostPage from "./pages/createPostPage/PostPage";
import AdminHomePages from "./pages/eventAdmin/AdminHomePages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <Router>
      <div className="wrapper">
        <Siderbar/>
        <div className="main">
          <Navbar/>
          <Routes>
            <Route path="/" element={<AdminHomePages />} />
            <Route path="admin/pages/postPages" element={<PostPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
