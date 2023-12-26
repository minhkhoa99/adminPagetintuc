import MainPages from "../../components/mainPages/MainPage";
import Navbar from "../../components/navbar/Navbar";
import Siderbar from "../../components/siderbar/Siderbar";
import './adminPage.css';
import '../../js/script.js';
const AdminPages = () => {
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
  
  export default AdminPages;