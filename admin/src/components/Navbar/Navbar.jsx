import './navbar.css';
import { Link } from "react-router-dom"; 
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { BiUserCircle } from "react-icons/bi"; // Import the Bootstrap icon



const Navbar = () =>{
    return (
       <div className='navbar2'>
        <div className='wrapper'>
            <div className='search'>
                <input type='text' placeholder='search...'/>
                <SearchOutlinedIcon />
            </div>
            <div className='items'>
                <div className='item'>
                    <LanguageOutlinedIcon className='icon'/>
                    English
                </div>
                <div className='item'>
                    <DarkModeOutlinedIcon className='icon'/>
                  
                </div>
                <div className='item'>
                    <FullscreenExitOutlinedIcon className='icon'/>
                    
                </div>
                <div className='item'>
                    <NotificationsNoneOutlinedIcon className='icon'/>
                    <div className='counter'>1</div>
                </div>
                <div className='item'>
                    <ChatBubbleOutlineOutlinedIcon className='icon'/>
                    <div className='counter'>2</div>

                    
                </div>
                <div className='item'>
                    <ListOutlinedIcon className='icon'/>
                    
                </div>
                <div className='item'>
                
                <BiUserCircle
                  size={40}
                  className="text-primary me-2"
                  style={{ cursor: "pointer" }}/>
                    
                </div>
                </div>
        </div>
       </div> 
    )
}

export default Navbar;