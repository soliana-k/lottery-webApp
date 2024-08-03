import "./sidebar.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StarIcon from '@mui/icons-material/Star';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArchiveIcon from '@mui/icons-material/Archive';
import BannerIcon from '@mui/icons-material/Announcement';
import FaqIcon from '@mui/icons-material/HelpOutline';
import TestimonialIcon from '@mui/icons-material/Feedback';
import { useState } from 'react';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const Sidebar = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [showNumberManagement, setShowNumberManagement] = useState(true);
  const [showPrizes, setShowPrizes] = useState(true);
  const [showContents, setShowContents] = useState(true);

  const handleUsersClick = () => {
    setShowUsers(!showUsers);
  };

  const handleNumberManagementClick = () => {
    setShowNumberManagement(!showNumberManagement);
  };

  const handlePrizesClick = () => {
    setShowPrizes(!showPrizes);
  };

  const handleContentsClick = () => {
    setShowContents(!showContents);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">DoubleB</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <hr/>
          <li onClick={handleUsersClick}>
            <PeopleIcon className="icon"/>
            <span>Users</span>
            {showUsers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </li>
          {showUsers && (
            <ul className="nested">
              <li>
              <ListAltIcon className="icon"/>
                <span>User List</span>
              </li>
              <li>
                <AddBoxIcon className="icon"/>
                <span>New Users</span>
              </li>
              <li>
                <StarIcon className="icon"/>
                <span>Winners</span>
              </li>
            </ul>
          )}
          <hr/>
          <li onClick={handleNumberManagementClick}>
            <BorderColorIcon className="icon"/>
            <span>Number Management</span>
            {showNumberManagement ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </li>
          {showNumberManagement && (
            <ul className="nested">
              <li>
                <BorderColorIcon className="icon"/>
                <span>Remaining Numbers</span>
              </li>
              <li>
                <SelectAllIcon className="icon" />
                <span>Selected Numbers</span>
              </li>
            </ul>
          )}
          <hr/>
          <li onClick={handlePrizesClick}>
            <MonetizationOnIcon className="icon"/>
            <span>Prizes</span>
            {showPrizes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </li>
          {showPrizes && (
            <ul className="nested">
              <li>
                <EmojiEventsIcon className="icon"/>
                <span>Featured Prizes</span>
              </li>
              <li>
                <ArchiveIcon className="icon" />
                <span>Past Prizes</span>
              </li>
            </ul>
          )}
          <hr/>
          <li>

          <MonetizationOnIcon className="icon"/>
          <span>payment</span>
          </li>
          <hr/>
          <li onClick={handleContentsClick}>
            <ContentPasteIcon className="icon"/>
            <span>Contents</span>
            {showContents ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </li>
          {showContents && (
            <ul className="nested">
              <li>
                <BannerIcon className="icon" />
                <span>Main Banner</span>
              </li>
              <li>
                <FaqIcon className="icon"/>
                <span>FAQ</span>
              </li>
              
              <li>
                <TestimonialIcon className="icon"/>
                <span>Testimonials</span>
              </li>
            </ul>
            
          )}
          <hr/>
          <li>
                <NotificationsNoneOutlinedIcon className="icon"/>
                <span>Notifications</span>
              </li>
              <hr/>
              <li>
                <ChatBubbleOutlineOutlinedIcon className="icon"/>
                <span>Messages</span>
              </li>
              <hr/>
              <li>
              <SettingsOutlinedIcon className="icon"/>

                <span>Setting</span>
              </li>
              <hr/>
              <li>
              <LoginOutlinedIcon className="icon"/>

                <span>Login</span>
              </li>
              <hr/>
              <li>
              <LogoutOutlinedIcon className="icon"/>

                <span>Logout</span>
              </li>
              <hr/>
              
              
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
}

export default Sidebar;
