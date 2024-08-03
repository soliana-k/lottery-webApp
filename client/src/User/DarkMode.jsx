import React from "react";
import { ReactComponent as Sun } from "../components/assets/Sun.svg";
import { ReactComponent as Moon } from "../components/assets/Moon.svg";
import "./DarkMode.css";

const DarkMode = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className='dark_mode'>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <Sun className='sun' />
        <Moon className='moon' />
      </label>
    </div>
  );
};

export default DarkMode;
