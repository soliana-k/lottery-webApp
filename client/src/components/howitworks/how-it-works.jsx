import React from 'react';
import { FaCoins, FaHandPointUp } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';
import { FaHandPointer } from 'react-icons/fa';
import { Accordion } from 'react-bootstrap';
import './how-it-works.css';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import 'bootstrap-icons/font/bootstrap-icons.css';

const StepsAside = () => {
    return (
        <aside className="steps-aside d-none d-md-flex border">
            <h2 className='d-block'>How It Works</h2>
            <div className="steps">
                <div className="step-icon"><i className="bi bi-hand-index-thumb"></i></div>
                <div className="step-text">Choose a number</div>
            </div>
            <div className="steps">
                <div className="step-icon"><i class="bi bi-currency-exchange"></i></div>
                <div className="step-text">Set your payment</div>
            </div>
            <div className="steps">
                <div className="step-icon"><i className="bi bi-trophy"></i></div>
                <div className="step-text">Win prizes</div>
            </div>
        </aside>
    );
};


const Hero=()=>{
    return(
        <div className="hero-section">
        <div className="hero-content">
            <h2 className=' mt-5 text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl'>How it works</h2>
            <Link to='/play' className="text-decoration-none">
            <button className="btn">Win Now!</button>
            </Link>
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

export const InfoSection = () => {
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
        <div className="play-now-container p-4 d-flex flex-column align-items-center justify-content-center mb-3">
            <div className="row justify-content-center align-items-center text-center">
                <div className="col-6 col-md-auto mb-3 mb-md-0 ">
                    <button className="play-now-btn rounded-pill px-5  py-2  px-sm-4 py-sm-1 px-md-5 py-md-2">
                        Play Now
                    </button>
                </div>
                <div className="col-auto col-sm-auto">
                    <h6 className="mb-0  text-white text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg">Start and wait until it rolls</h6>
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
            <div className=" row section-container">
                <div className="left-side col-md-8">
                    <NumberSelection />
                    <div className="start-lottery-container mr-5">
                            <button className="start-lottery-btn">
                                Start Lottery
                                <FaHandPointer className="h-icon" />
                            </button>
                        </div>
                    
                </div>
                <div className="col-md-3 steps-aside-wrapper">
                    <StepsAside />
                </div>
                
            </div>
           
       \
            <PlayNow />
            {/* <FAQAccordion /> */}
            <Footer/>
        </>
    );
}

export default Section;
