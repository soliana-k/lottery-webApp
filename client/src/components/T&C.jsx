import React, { useState } from 'react';
import './styles.css';

import { useNavigate } from 'react-router-dom';
const Terms = ({ showModal, handleClose }) => {
    const [agreeChecked, setAgreeChecked] = useState(false);
    const [dontAskAgainChecked, setDontAskAgainChecked] = useState(false);
    const navigate = useNavigate();

    const handleAgreeChange = () => {
        setAgreeChecked(!agreeChecked);
    };

    const handleDontAskAgainChange = () => {
        setDontAskAgainChecked(!dontAskAgainChecked);
    };
    const handleNextClick = () => {
        if (agreeChecked) {
            navigate('/play');
        } else {
            console.error('You must agree to the terms and conditions to proceed.');
        }
    };


    return (
        <>
            {showModal && (
                <div className='modal show d-block' tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className='modal-dialog custom-modal-width' role="document">
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h3 className='modal-title'>Terms and Conditions</h3>
                            </div>
                            <div className='modal-body'>
                            <h5>Overview</h5>
                            These Terms and Conditions govern the use of our
                             lottery website and participation in our lottery games. 
                             By accessing or using our website, you agree to be bound
                              by these terms. If you do not agree with any part of these terms,
                               please do not use our website or participate in our lottery.

                            <h5>Eligibility</h5>
                            In order to participate in our lottery, you must be at least 18 years
                             of age and a legal resident of [Country/State]. Employees of our company
                              and their immediate family members are not eligible to participate.

                            <h5>Purchasing Lottery Tickets</h5>
                            Lottery tickets can be purchased on our website using [accepted payment methods].
                             All ticket purchases are final and non-refundable. We reserve the right to refuse 
                             service to anyone for any reason.

                            <h5>Drawing and Prizes</h5>
                            Lottery drawings are held on the scheduled dates listed on our website. Winning 
                            numbers will be posted on our website and announced publicly. Prize claims must 
                            be submitted within [X] days of the drawing date. Unclaimed prizes will be forfeited.
                             Prizes are not transferable and cannot be substituted for cash.

                            <h5>Limitation of Liability</h5>
                             In no event shall we be liable for any indirect, special, incidental, or consequential
                              damages related to your use of our website or participation in our lottery games.
                               Our maximum liability shall be limited to the cost of your lottery ticket purchase.

                            <h5>Privacy and Security</h5>
                            We take the privacy and security of your personal information seriously. Our privacy 
                            policy outlines how we collect, use, and protect your data. We use industry-standard 
                            security measures to protect the integrity of our website and lottery system.
            
                            <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={agreeChecked}
                                        onChange={handleAgreeChange}
                                    />
                                    <label className="form-check-label">
                                        I understand and agree to the terms and conditions.
                                    </label>
                            </div>
                            <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={dontAskAgainChecked}
                                        onChange={handleDontAskAgainChange}
                                    />
                                    <label className="form-check-label">
                                        Don't ask me again.
                                    </label>
                            </div>
                            </div>
                            <div className='modal-footer'>
                                <button type="button" className='custom-btn custom-btn-next' onClick={handleNextClick} disabled={!agreeChecked} >Next</button>
                                <button type="button" className='custom-btn custom-btn-cancel' onClick={handleClose}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Terms;
