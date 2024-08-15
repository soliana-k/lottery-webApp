import React from 'react';
import './Prizes.css';
import Currentprizes from '../components/currentprizes';
import Past from '../components/past';
import Testimonials from '../components/Testimonials';
import TestimonialForm from '../components/TestimonialForm';
import Footer from '../components/Footer';

const Prizes = () => {
    return (
        <div className="page-container">
            <div className="content">
                <div className='current'>
                    <Currentprizes />
                </div>
                <div className='past'>
                    <Past />
                </div>
                <div className='testimonials'>
                    <Testimonials />
                </div>
                <div className='testimonial-form'>
                    <TestimonialForm />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Prizes;
