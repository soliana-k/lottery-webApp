import "./home.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/Navbar";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Link } from 'react-router-dom';

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
                <MonetizationOnIcon className="card_icon" />
                <div className="card-content">
                  <h5>Prizes Management</h5>
                  <p className="card-description">
                    Manage and update prize details here. You can add new prizes or modify existing ones.
                  </p>
                  <Link to="/prizes" className="card-link">Go to Prizes Management</Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-inner">
                <BorderColorIcon className="card_icon" />
                <div className="card-content">
                  <h5>Number Management</h5>
                  <p className="card-description">
                    View and manage selected and remaining numbers. Update number allocations as needed.
                  </p>
                  <Link to="/numbers" className="card-link">Go to Number Management</Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-inner">
                <ContentPasteIcon className="card_icon" />
                <div className="card-content">
                  <h5>Content Management</h5>
                  <p className="card-description">
                    Update and manage website content. This includes text, images, and other media.
                  </p>
                  <Link to="/content" className="card-link">Go to Content Management</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
