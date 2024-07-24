import React from 'react';
import './how.css';
import NumberSelection from '../components/howitworks/how/numberSelection';
import BiddingPayment from '../components/howitworks/how/BiddingPayment';
import FAQAccordion from '../components/howitworks/how/Faq';
import StepsAside from '../components/howitworks/how/aside';
import InfoSection from '../components/howitworks/how/infosection';
import { FaHandPointer } from 'react-icons/fa';
import PlayNow from '../components/howitworks/how/playNow';
import Footer from '../components/Footer';

const How_it_works = () => {
    return (
        <div>
            <div className="hero-section">
                <div className="hero-content">
                    <h1>How it works</h1>
                    <button className="btn btn-primary">Win Now</button>
                </div>
            </div>
            <InfoSection />
            <div className="how-it-works">
                <div className="main-content">
                    <div className="left-side">
                        <NumberSelection />
                        <BiddingPayment />
                        {/* New Start Lottery Button */}
                        <div className="start-lottery-container">
                            <button className="start-lottery-btn">
                                Start Lottery
                                <FaHandPointer className="h-icon" />
                            </button>
                        </div>
                    </div>
                    <StepsAside />
                </div>
                <PlayNow/>
                <footer className="faq-section">
                    <FAQAccordion />
                </footer>
            </div>
            <Footer/>
        </div>
    );
};

export default How_it_works;
