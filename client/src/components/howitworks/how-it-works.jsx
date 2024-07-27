import React from 'react';
import { FaCoins, FaHandPointUp } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';
import { FaHandPointer } from 'react-icons/fa';
import { Accordion } from 'react-bootstrap';
import './how-it-works.css';

const StepsAside = () => {
    return (
        <aside className="steps-aside d-none d-md-block">
            <h2>How It Works</h2>
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
        </aside>
    );
};

const BiddingPayment = () => {
    return (
        <div className="bidding-payment">
            <div className="amount-controller">
                <button className="amount-button">
                    <FaHandPointer className="hand-icon" />
                    +
                </button>
                <input className="amount-input" type="text" value="ETB 200" readOnly />
                <button className="amount-button" disabled>-</button>
            </div>
            <h5>Set Your Bidding Amount</h5>
        </div>
    );
};
const Hero=()=>{
    return(
        <div className="hero-section">
        <div className="hero-content">
            <h1>How it works</h1>
            <button className="btn btn-primary">Win Now</button>
        </div>
    </div>
    )
}

const FAQAccordion = () => {
    return (
        <div className="faq-accordion">
            <h2>FAQ</h2>
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>What is the purpose of this platform?</Accordion.Header>
                    <Accordion.Body>
                        Our platform aims to simplify and streamline the process of participating in various activities, making it accessible and easy for everyone.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>How can I contact support?</Accordion.Header>
                    <Accordion.Body className='custom'>
                        You can contact our support team through the contact form on our website or by sending an email to support@example.com.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>What are the payment options available?</Accordion.Header>
                    <Accordion.Body>
                        We accept various payment methods including credit/debit cards, PayPal, and bank transfers.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

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

const NumberSelection = () => {
    const selectedNumber = 38;
    const rows = [
        Array.from({ length: 13 }, (_, i) => i),
        Array.from({ length: 13 }, (_, i) => i + 13),
        Array.from({ length: 13 }, (_, i) => i + 26),
        Array.from({ length: 13 }, (_, i) => i + 39),
        Array.from({ length: 13 }, (_, i) => i + 52),
        Array.from({ length: 11 }, (_, i) => i + 65),
        Array.from({ length: 5 }, (_, i) => i + 76),
    ];

    return (
        <div className="number-selection">
            <h2>Lottery Game</h2>
            <div className="number-grid">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className={`number-row ${rowIndex >= 5 ? 'decreased' : ''}`}>
                        {row.map(num => (
                            <div
                                key={num}
                                className={`number-circle ${selectedNumber === num ? 'selected' : ''}`}
                            >
                                {num}
                                {num === selectedNumber && (
                                    <div className="icon-wrapper">
                                        <FaHandPointer className="icon-highlight" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="selection-instruction">
                <h3>Choose your numbers</h3>
            </div>
        </div>
    );
};

const PlayNow = () => {
    return (
        <div className="play-now-container">
            <div className="row justify-content-center align-items-center text-center">
                <div className="col-auto">
                    <button className="play-now-btn">
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

const Section = () => {
    return (
        <>
        <Hero/>
            <InfoSection />
            <div className="section-container">
                <div className="left-side">
                    <NumberSelection />
                    <BiddingPayment />
                </div>
                <div className="steps-aside-wrapper">
                    <StepsAside />
                </div>
            </div>
            <PlayNow />
            <FAQAccordion />
        </>
    );
}

export default Section;
