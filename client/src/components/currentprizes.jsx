import React, { useEffect, useState } from 'react';
import Terms from './T&C'; // Adjust the import path as needed
import './styles.css';
import axios from 'axios';

const CurrentPrizes = () => {
    const [showModal, setShowModal] = useState(false);
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/prizes'); // Fetch from backend API
                setPrizes(response.data); // Set all prizes
            } catch (err) {
                setError('Failed to fetch prizes. Please try again later.');
                console.error('Error fetching prizes:', err);
            } finally {
                setLoading(false); // Stop loading after fetching or error
            }
        };

        fetchPrizes();
    }, []);

    // Step 1: Filter prizes that haven't passed their draw date
    const futurePrizes = prizes.filter(prize => new Date(prize.drawDate) > new Date());

    return (
        <section className='currprize'>
            <h2 className="mt-5 pt-4 mb-4 text-center fw-bold h-font">Featured Prizes</h2>
            
            <div className='container'>
                {loading ? (
                    <p className="text-center">Loading prizes...</p>
                ) : error ? (
                    <p className="text-center text-danger">{error}</p>
                ) : futurePrizes.length > 0 ? (
                    <div className='row justify-content-center'>
                        {futurePrizes.map((prize) => (
                            <div key={prize._id} className='col-lg-4 col-md-6 mb-4 custom-height'>
                                <div className="card border-0 shadow">
                                    <img 
                                        src={`http://localhost:8000/uploads/${prize.image}`} 
                                        className="card-img-top img-fluid" 
                                        alt={prize.name} 
                                    />
                                    <div className="card-body">
                                        <h5>{prize.name}</h5>
                                        <p>
                                            Amount: {prize.price} br <br />
                                            Deadline: {new Date(prize.deadline).toLocaleDateString()} <br />
                                            Draw: {new Date(prize.drawDate).toLocaleDateString()}
                                        </p>
                                        <button className="btn btn-primary" onClick={handleShow}>Play now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No current prizes available at the moment.</p>
                )}

                <Terms showModal={showModal} handleClose={handleClose} />
            </div>
        </section>
    );
};

export default CurrentPrizes;
