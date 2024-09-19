import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import './PrizesDetail.css';

const PrizesDetail = () => {
    const { id } = useParams();
    const [prize, setPrize] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState(''); // State to track the main image
    const navigate = useNavigate(); // Use navigate for redirecting

    const user = useSelector((state) => state.auth.user); // Access the user from Redux state

    const handlePlayNowClick = () => {
        if (!user) {
            alert('Please login first!');
            navigate('/signIn'); // Redirect to login page if not logged in
        } else {
            navigate(`/play/${id}`); // Proceed to play if logged in
        }
    };

    useEffect(() => {
        const fetchPrizeDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/prizes/${id}`);
                setPrize(response.data);
                setMainImage(response.data.mainImage); // Set the initial main image
            } catch (err) {
                setError('Failed to fetch prize details. Please try again later.');
                console.error('Error fetching prize details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrizeDetail();
    }, [id]);

    if (loading) return <p>Loading prize details...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!prize) return <p>No prize details available.</p>;

    return (
        <div>
            <div className="prizedisplay">
                <div className="prizedisplay-left">
                    <div className="prizedisplay-img-list">
                        {/* Thumbnail images */}
                        <img 
                            src={`http://localhost:8000/uploads/${prize.mainImage}`} 
                            alt={prize.name} 
                            onClick={() => setMainImage(prize.mainImage)} 
                        />
                        <img 
                            src={`http://localhost:8000/uploads/${prize.additionalImage1}`} 
                            alt={`${prize.name} - additional image 1`} 
                            onClick={() => setMainImage(prize.additionalImage1)} 
                        />
                        <img 
                            src={`http://localhost:8000/uploads/${prize.additionalImage2}`} 
                            alt={`${prize.name} - additional image 2`} 
                            onClick={() => setMainImage(prize.additionalImage2)} 
                        />
                        <img 
                            src={`http://localhost:8000/uploads/${prize.additionalImage3}`} 
                            alt={`${prize.name} - additional image 3`} 
                            onClick={() => setMainImage(prize.additionalImage3)} 
                        />
                    </div>
                    <div className="prizedisplay-img">
                        {/* Display the main image */}
                        <img 
                            className="prizedisplay-main-img" 
                            src={`http://localhost:8000/uploads/${mainImage}`} 
                            alt={prize.name} 
                        />
                    </div>
                </div>
                <div className="prizedisplay-right">
                    <h1>{prize.name}</h1>
                    <div className="prizedisplay-right-prices">
                        <p>Amount: {prize.price} br</p>
                    </div>
                    <div className="prizedisplay-right-Description">
                        <p>{prize.description}</p>
                    </div>
                    <div className="prizedisplay-right-Deadline">
                        <p>Deadline: {new Date(prize.deadline).toLocaleDateString()}</p>
                    </div>
                    <div className="prizedisplay-right-draw">
                        <p>Draw: {new Date(prize.drawDate).toLocaleDateString()}</p>
                    </div>
                    <div className="checkout-button-container">
                        <button className="checkout-button" onClick={handlePlayNowClick}>
                            Play Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrizesDetail;
