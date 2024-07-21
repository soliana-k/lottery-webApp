import React from 'react';
import './how.css';
import NumberSelection from '../components/howitworks/how/numberSelection';
import BiddingPayment from '../components/howitworks/how/BiddingPayment';
import FAQAccordion from '../components/howitworks/how/Faq';
import StepsAside from '../components/howitworks/how/aside';
import InfoSection from '../components/howitworks/how/infosection';

const How_it_works = () => {
    return (
        <div>
            <div className="hero-section">
                <div className="hero-content">
                    <h1>How it works</h1>
                    <button className="btn btn-primary">Win Now</button>
                </div>
            </div>
            <InfoSection/>
            <div className="how-it-works">
                <div className="main-content">
                    <div className="left-side">
                        <NumberSelection />
                        <BiddingPayment />
                    </div>
                    <StepsAside />
                </div>
                <footer className="faq-section">
                    <FAQAccordion />
                </footer>
            </div>
        </div>
    );
};

export default How_it_works;
