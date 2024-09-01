import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Hook to get route parameters
import './PrizesDetail.css'; // Import CSS for styling
import PlayNow from './playNow'; // Ensure the correct import of the PlayNow component
const PrizesDetail = () => {
    const { id } = useParams(); // Get the prize ID from the route parameters
    const [prize, setPrize] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrizeDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/prizes/${id}`);
                setPrize(response.data);
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
        <div className="prize-detail">
            <div className="prize-images">
                <img
                    src={`http://localhost:8000/uploads/${prize.image}`} // Ensure the path is correct
                    alt={prize.name}
                    className="img-fluid main-image"
                />
                <div className="additional-images">
                    <img
                        src={`http://localhost:8000/uploads/${prize.image}`} // Example additional images
                        alt={prize.name}
                        className="img-fluid"
                    />
                    <img
                        src={`http://localhost:8000/uploads/${prize.image}`}
                        alt={prize.name}
                        className="img-fluid"
                    />
                    <img
                        src={`http://localhost:8000/uploads/${prize.image}`}
                        alt={prize.name}
                        className="img-fluid"
                    />
                </div>
            </div>
            <div className="prize-details">
                <h2>{prize.name}</h2>
                <p>Amount: {prize.price} br</p>
                <p>Deadline: {new Date(prize.deadline).toLocaleDateString()}</p>
                <p>Draw: {new Date(prize.drawDate).toLocaleDateString()}</p>
                <p>Description: {prize.description}</p> {/* Add description field */}
                <button className="btn btn-primary">Go to Checkout</button>
            </div>
            
            </div>
            <div className="play-now-section">
            <PlayNow />
            </div>
          

            </div>


    );
   
};

export default PrizesDetail;
