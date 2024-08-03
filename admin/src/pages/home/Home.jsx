import "./home.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/Navbar";
import Login from "../../components/login/Login";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';



const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
         <div className="Homecontent">
          <div className="main-cards">
            <div className="card">
              <div className="card-inner">
                <h3>Prizes Managment</h3>
                <MonetizationOnIcon className="icon"/>
             </div>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>Number Managment</h3>
                <BorderColorIcon className="icon"/>
                </div>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>Content Managment</h3>
                <ContentPasteIcon className="icon"/>
                </div>
            </div>
          </div>
         </div>
      </div>
    </div>
  );
};
export default Home;
