import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Login from "../../components/login/Login";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
         <div className="login">
          <Login />
         </div>


      </div>
    </div>
  );
};
export default Home;
