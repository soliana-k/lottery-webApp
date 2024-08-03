import "./home.css";
// import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/Navbar/navbar";
import Login from "../../components/login/Login";
import Sidebar from "../../components/sidebar/sidebar";
// import Navbar from "../../components/Navbar/navbar";
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
