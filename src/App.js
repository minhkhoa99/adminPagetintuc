import "./App.css";
import Siderbar from "./components/siderbar/Siderbar";
import PostPage from "./pages/createPostPage/PostPage";
import AdminHomePages from "./pages/eventAdmin/AdminHomePages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import UpdatePage from "./pages/updatePostPage/UpdatePages";
import Login from "./pages/login/Login";
import React from "react";
import Register from "./pages/register/Register";
import TableUser from "./pages/table-user/TableUser";

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="wrapper">
          <Siderbar />
          <div className="main">
            <Navbar />
            <Routes>
              <Route path="/admin/home-page" element={<AdminHomePages />} />
              <Route path="admin/pages/postPages" element={<PostPage />} />
              <Route path="admin/pages/updatePages" element={<UpdatePage />} />
              <Route path="/admin/register" element={<Register />} />
              <Route path="/admin/user" element={<TableUser />} />

            </Routes>
          </div>
        </div>
        <div className="theme-toggle">
          <i className="fa-regular fa-moon"></i>
          <i className="fa-regular fa-sun"></i>
        </div>
      </Router>
      <Router>
        <Routes>
          <Route path="/admin/" element={<Login />} />
        </Routes>
      </Router>
    </React.Fragment>


  );
}

export default App;
