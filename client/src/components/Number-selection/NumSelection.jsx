import React from 'react'

import NumberSelection from './numberSelection'
import HowItWorks from '../HowItWorks';
import { useSelector, useDispatch } from 'react-redux';

import { selectNumber } from '../../redux/lotterySlice';
import NumberSelectionPage from './nSP';
import { InfoSection } from '../howitworks/how-it-works';

const StartLotteryButton = () => {
    const dispatch = useDispatch();
    const selectedNumber = useSelector(state => state.lottery.selectedNumber);

    const handleClick = () => {
       
        console.log('Starting lottery with number:', selectedNumber);
    };

    return (
        <div className="start-lottery-container">
            <button
                className="start-lottery-btn"
                disabled={selectedNumber === null}
                onClick={handleClick}
            >
                Start Lottery
            </button>
        </div>
    );
};








function Ns() {
  return (
    <div>
        
      
        <InfoSection/>
        <NumberSelectionPage/>
        <StartLotteryButton/>
        
    </div>
  )
}

export default Ns