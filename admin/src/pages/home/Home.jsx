import "./home.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Login from "../../components/login/Login";
import NumberManagement from "../../NumberManagement";


const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <NumberManagement/>
         {/* <div className="login">
          <Login />
         </div> */}


      </div>
    </div>
  );
};
export default Home;
