import React from 'react'
import BiddingPayment from './BiddingPayment'
import NumberSelection from './numberSelection'
import HowItWorks from '../HowItWorks';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import { selectNumber } from '../../redux/lotterySlice';

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
        
        <HowItWorks/>
        <NumberSelection/>
        <BiddingPayment/>
        <StartLotteryButton/>
        
    </div>
  )
}

export default Ns