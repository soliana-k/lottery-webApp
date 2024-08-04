import "./home.css";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Home = () => {
  const notifications = [
    {
      id: 1,
      message: "The next lottery draw is scheduled for 2024-08-01.",
      date: "2024-07-25",
    },
    {
      id: 2,
      message: "The results for the July draw have been published.",
      date: "2024-07-21",
    },
  ];

  const messages = [
    {
      id: 1,
      message: "A new batch of lottery tickets is available for sale.",
      date: "2024-07-24",
    },
    {
      id: 2,
      message: "The prize fund for the August draw has been increased.",
      date: "2024-07-23",
    },
  ];

  return (
    <div className="home">
  <div className="homeContainer">
    <div className="Homecontent">
      <div className="main-cards">
        <div className="card">
          <div className="header-with-icon">
            <MonetizationOnIcon className="card_icon" />
            <h3>Prizes Management</h3>
          </div>
          <div className="card-content">
            <p className="card-description">
              Manage and update prize details here. You can add new prizes or modify existing ones.
            </p>
            <Link to="/prizes" className="card-link">Go to Prizes Management</Link>
          </div>
        </div>
        <div className="card">
          <div className="header-with-icon">
            <BorderColorIcon className="card_icon" />
            <h3>Number Management</h3>
          </div>
          <div className="card-content">
            <p className="card-description">
              View and manage selected and remaining numbers. Update number allocations as needed.
            </p>
            <Link to="/numbers" className="card-link">Go to Number Management</Link>
          </div>
        </div>
        <div className="card">
          <div className="header-with-icon">
            <ContentPasteIcon className="card_icon" />
            <h3>Content Management</h3>
          </div>
          <div className="card-content">
            <p className="card-description">
              Update and manage website content. This includes text, images, and other media.
            </p>
            <Link to="/content" className="card-link">Go to Content Management</Link>
          </div>
        </div>
      </div>

      <div className="cards-container">
        <div className="card notification-card">
          <div className="header-with-icon">
            <NotificationsIcon className="section-icon" />
            <h3>Notifications</h3>
          </div>
          <hr/>
          <div className="card-content">
            <ul className="notification-list">
              {notifications.map((notification) => (
                <li key={notification.id} className="notification-item">
                  <p>{notification.message}</p>
                  <span className="notification-date">{notification.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card message-card">
          <div className="header-with-icon">
            <MessageIcon className="section-icon" />
            <h3>Messages</h3>
          </div>
          <hr/>

          <div className="card-content">
            <ul className="notification-list">
              {messages.map((message) => (
                <li key={message.id} className="notification-item">
                  <p>{message.message}</p>
                  <span className="notification-date">{message.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Home;
