import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainBanner = () => {
  const [settings, setSettings] = useState({
    text: 'Bet the Number, Win Big Prizes',
    subText: 'Play Now and Try Your Luck!',
    fontSize: '2rem',
    backgroundColor: 'rgb(19,51,81)',
  });
  const navigate = useNavigate(); // Use navigate for redirecting

  const user = useSelector((state) => state.auth.user); // Access the user from Redux state

  const handlePlayNowClick = () => {
    if (!user) {
        alert('Please login first!');
        navigate('/signIn'); // Redirect to login page if not logged in
    } else {
        navigate(`/play`); // Proceed to play if logged in
    }
};

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/v1/banner');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching banner settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="main-banner" style={{ backgroundColor: settings.backgroundColor }}>
      <div className="banner">
        <div className="banner-text text-center">
          <h2 className="mt-5 pt-4 mb-4 fw-bold h-font" style={{ fontSize: settings.fontSize }}>
            {settings.text}
          </h2>
          <p>{settings.subText}</p>
          <Link to="/prizes">
          <button className="btn btn-primary">Play now</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default MainBanner;