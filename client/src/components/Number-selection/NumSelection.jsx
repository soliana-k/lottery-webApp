import React , {useState} from 'react'

import NumberSelection from './numberSelection'
import HowItWorks from '../HowItWorks';
import { useSelector, useDispatch } from 'react-redux';

import NumberSelectionPage from './nSP';
import { InfoSection } from '../howitworks/how-it-works';


import { selectNumber } from '../../redux/lotterySlice';
import { useNavigate } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';

// Ensure to include Bootstrap CSS

const StartLotteryButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedNumber = useSelector(state => state.lottery.selectedNumber);
    const paymentCompleted = useSelector(state => state.lottery.paymentCompleted);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleClick = async () => {
        if (!paymentCompleted) {
            alert('Please complete payment before starting the lottery.');
            return;
        }

        try {
            const response = await fetch('/api/v1/lottery/start-lottery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ number: selectedNumber }),
            });

            if (response.ok) {
                setShowSuccessModal(true); // Show success modal
                setTimeout(() => {
                    navigate('/lottery-results'); // Redirect after showing modal
                }, 2000); // Adjust time if needed
            } else {
                throw new Error('Failed to start lottery');
            }
        } catch (error) {
            console.error('Error starting lottery:', error);
        }
    };

    return (
        <div className="start-lottery-container">
            <button
                className="start-lottery-btn"
                disabled={selectedNumber === null || !paymentCompleted}
                onClick={handleClick}
            >
                Start Lottery
            </button>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>The lottery has started successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
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