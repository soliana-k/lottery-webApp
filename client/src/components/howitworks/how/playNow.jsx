import React from 'react';
import './playNow.css'; // Create this file for additional styling if needed

const PlayNow = () => {
    return (
        <div className="play-now-container">
            <div className="row justify-content-center align-items-center text-center">
                <div className="col-auto">
                    <button className=" play-now-btn">
                        Play Now
                    </button>
                </div>
                <div className="col-auto">
                    <h4>Start and wait until it rolls</h4>
                </div>
            </div>
        </div>
    );
};

export default PlayNow;
