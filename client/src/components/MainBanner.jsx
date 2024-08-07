import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
const MainBanner = () => {
  return (
    <div className="main-banner">
      <div className="banner ">
        <div className="banner-text text-center">
        <h2 className="mt-5 pt-4 mb-4  fw-bold h-font">Bet the Number, Win Big Prizes</h2>
        <p>Play Now and Try Your Luck!</p>
        <Link to="/play" className="btn btn-primary">Play now</Link>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;