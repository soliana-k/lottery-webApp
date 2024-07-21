import React from 'react';
import './infosection.css'; 
import { FaHandPointUp, FaCoins } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';

const InfoSection = () => {
    return (
        <div className="info-section">
            <div className="step">
                <div className="step-icon"><FaHandPointUp /></div>
                <div className="step-text">Choose a number</div>
            </div>
            <div className="step">
                <div className="step-icon"><FaCoins /></div>
                <div className="step-text">Set your payment</div>
            </div>
            <div className="step">
                <div className="step-icon"><GiTrophyCup /></div>
                <div className="step-text">Win prizes</div>
            </div>
        </div>
    );
};

export default InfoSection;
