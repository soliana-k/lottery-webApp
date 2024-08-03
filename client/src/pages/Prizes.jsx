import React from 'react';
import './Prizes.css';
import Currentprizes from '../components/currentprizes.jsx';
import Past from '../components/past.jsx'
import Testimonials from '../components/Testimonials.jsx';
import Footer from'../components/Footer.jsx';

const Prizes = () => {
    return (
        <div>
            <div className='current'>
            <Currentprizes/>
            </div>
            <div className='past'>
            <Past/>
            </div>
            <div className='testimonials'>
                <Testimonials/>
            </div>
            <div className='Footer'>
                <Footer/>
            </div>


        </div>
    )
}
export default Prizes;