import MainPages from "../../components/mainPages/MainPage.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Siderbar from "../../components/siderbar/Siderbar.jsx";
import './adminPage.css';
import '../../js/script.js';
const AdminHomePages = () => {
    return (

             <div className="wrapper">
       <Siderbar></Siderbar>  
       <div className="main">
       <Navbar></Navbar>
       <MainPages></MainPages>
        </div>  
     
        
      </div>

     
    );
  }
  
  export default AdminHomePages;