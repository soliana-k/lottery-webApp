import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link  } from 'react-router-dom';
import './PrizesDetail.css';
import PlayNow from './playNow';


const PrizesDetail = () => {
    const { id } = useParams();
    const [prize, setPrize] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState(''); // State to track the main image

    useEffect(() => {
        const fetchPrizeDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/prizes/${id}`);
                setPrize(response.data);
                setMainImage(response.data.image); // Set the initial main image
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
                        {/* Map through the images and add onClick handler to update the main image */}
                        <img 
                            src={`http://localhost:8000/uploads/${prize.mainImage}`} 
                            alt={prize.name} 
                            onClick={() => setMainImage(prize.image)} 
                        />
                        <img 
                            src={`http://localhost:8000/uploads/${prize.image}`} 
                            alt={prize.name} 
                            onClick={() => setMainImage(prize.image)} 
                        />
                        <img 
                            src={`http://localhost:8000/uploads/${prize.image}`} 
                            alt={prize.name} 
                            onClick={() => setMainImage(prize.image)} 
                        />
                        <img 
                            src={`http://localhost:8000/uploads/${prize.image}`} 
                            alt={prize.name} 
                            onClick={() => setMainImage(prize.image)} 
                        />
                    </div>
                    <div className="prizedisplay-img">
                        {/* Display the main image */}
                        <img 
                            className="prizedisplay-main-img" 
                            src={`http://localhost:8000/uploads/${prize.mainImage}`} 
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
                    <Link to={`/play/${id}`}>
              <button className="checkout-button">Play Now</button>
            </Link>
                   
                </div>
                </div>
            </div>
            
        </div>
    );
};

export default PrizesDetail;
