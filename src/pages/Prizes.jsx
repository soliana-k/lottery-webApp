import React from 'react';
import './Prizes.css';
import FeaturedPrizes from '../components/FeaturedPrizes.jsx';
import Past from '../components/past.jsx'
import Testimonials from '../components/Testimonials.jsx';

const Prizes = () => {
    return (
        <div>
            <div className='featured'>
            <FeaturedPrizes/>
            </div>
            <div className='past'>
            <Past/>
            </div>
            <div className='testimonials'>
                <Testimonials/>
            </div>

        </div>
    )
}
export default Prizes;