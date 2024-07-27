import React from 'react';
import './how.css';

import Section from '../components/howitworks/how-it-works';

const How_it_works = () => {
    return (
        <div>
            {/* <div className="hero-section">
                <div className="hero-content">
                    <h1>How it works</h1>
                    <button className="btn btn-primary">Win Now</button>
                </div>
            </div>
            <InfoSection />
            <div className="how-it-works">
                <div className=" row main-content">
                    <div className=" col-6 left-side">
                        <NumberSelection />
                        <BiddingPayment />
                        {/* New Start Lottery Button */}
                        {/* <div className="start-lottery-container">
                            <button className="start-lottery-btn">
                                Start Lottery
                                <FaHandPointer className="h-icon" />
                            </button>
                        </div>
                    </div>
                    <div className='col-6'>
                    <StepsAside />
                    </div>
                    
                </div>
                <PlayNow/>
                <footer className="faq-section">
                    <FAQAccordion />
                </footer>
            </div>
            <Footer/> */}
            <Section/>
        </div> 
    );
};

export default How_it_works;
