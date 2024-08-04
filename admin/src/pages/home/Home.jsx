import "./home.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/Navbar";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Home = () => {
  const notifications = [
    { id: 1, message: 'The next lottery draw is scheduled for 2024-08-01.', date: '2024-07-25' },
    { id: 2, message: 'The results for the July draw have been published.', date: '2024-07-21' },
  ];

  const messages = [
    { id: 1, message: 'A new batch of lottery tickets is available for sale.', date: '2024-07-24' },
    { id: 2, message: 'Update: The prize fund for the August draw has been increased.', date: '2024-07-23' },
  ];

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

          <div className="cards-container">
            <div className="notification-section">
              <Card className="notification-card">
                <Card.Header className="notification-header d-flex justify-content-between align-items-center">
                  <div className="header-with-icon">
                    <NotificationsIcon className="section-icon" />
                    <h5>Notifications</h5>
                  </div>
                  <div>
                    <i className='bx bx-filter ml-2'></i>
                  </div>
                </Card.Header>
                <Card.Body>
                  <ul className="notification-list">
                    {notifications.map(notification => (
                      <li key={notification.id} className="notification-item d-flex align-items-center">
                       
                        <p>{notification.message}</p>
                        <span className="notification-date">{notification.date}</span>
                       
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>

            <div className="message-section">
              <Card className="message-card">
                <Card.Header className="notification-header d-flex justify-content-between align-items-center">
                  <div className="header-with-icon">
                    <MessageIcon className="section-icon" />
                    <h5>Messages</h5>
                  </div>
                  <div>
                    <i className='bx bx-filter ml-2'></i>
                  </div>
                </Card.Header>
                <Card.Body>
                  <ul className="notification-list">
                    {messages.map(message => (
                      <li key={message.id} className="notification-item d-flex align-items-center">
                     
                        <p>{message.message}</p>
                        <span className="notification-date">{message.date}</span>
                        
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
