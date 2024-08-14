import React from 'react';
import './Prizes.css';
import Currentprizes from '../components/currentprizes.jsx';
import Past from '../components/past.jsx';
import Testimonials from '../components/Testimonials.jsx';
import TestimonialForm from '../components/TestimonialForm';
import Footer from '../components/Footer.jsx';

const Prizes = () => {
    return (
        <div>
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
                <TestimonialForm /> {/* Add TestimonialForm component */}
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default Prizes;
