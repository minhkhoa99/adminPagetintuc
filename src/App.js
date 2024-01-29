import "./App.css";
import Siderbar from "./components/siderbar/Siderbar";
import PostPage from "./pages/createPostPage/PostPage";
import AdminHomePages from "./pages/eventAdmin/AdminHomePages";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import UpdatePage from "./pages/updatePostPage/UpdatePages";
import Login from "./pages/login/Login";
import React, { useEffect } from "react";
import Register from "./pages/register/Register";
import TableUser from "./pages/table-user/TableUser";
import Cookies from "js-cookie";
import UpdateUser from "./pages/updateUser/UpdateUser";
import TableImage from "./pages/table-image-link/Table";
import UpdateImage from "./pages/table-image-link/tableUpdate";
import ImageTable from "./pages/image-slider/Image-table";

const App = () => {
  const token = Cookies.get("Authorization");


  return (
    <Router>
      {token ? (
        <div className='wrapper'>
          <Siderbar />
          <div className='main'>
            <Navbar />
            <Routes>
              <Route
                path='/*' // Redirect to home page if token exists
                element={<Navigate to='/admin/home-page' replace />}
              />
              <Route path='/admin/home-page' element={<AdminHomePages />} />
              <Route path='/admin/pages/postPages' element={<PostPage />} />
              <Route path='/admin/pages/updatePages' element={<UpdatePage />} />
              <Route path='/admin/register' element={<Register />} />
              <Route path='/admin/user' element={<TableUser />} />
              <Route path='/admin/user/:id' element={<UpdateUser />} />
              <Route path='/admin/image/' element={<TableImage />} />
              <Route path="/admin/slide/" element={<ImageTable />} />
              <Route path='/admin/image/:id' element={<UpdateImage />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path='/admin/*' element={<Login />} />
          <Route // Redirect to login page for all other routes if token doesn't exist
            path='*'
            element={<Navigate to='/admin/' replace />}
          />
        </Routes>
      )}
    </Router>
  );
};
export default App;
