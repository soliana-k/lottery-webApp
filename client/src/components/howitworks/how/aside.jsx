import React from 'react';
import './aside.css'; 
import {FaCoins, FaHandPointUp} from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';

const StepsAside = () => {
    return (
        <aside className="steps-aside">
            <h2>How It Works</h2>
            <div className="step">
                <div className="step-icon"><FaHandPointUp/></div>
                <div className="step-text">Choose a number</div>
            </div>
            <div className="step">
                <div className="step-icon"><FaCoins/></div>
                <div className="step-text">Set your payment</div>
            </div>
            <div className="step">
                <div className="step-icon"><GiTrophyCup/></div>
                <div className="step-text">Win prizes</div>
            </div>
        </aside>
    );
};

export default StepsAside;
