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
        <div className="prizedisplay">
            <div className="prizedisplay-left">
                <div className="prizedisplay-img-list">
                    <img
                        src={`http://localhost:8000/uploads/${prize.image}`}
                        alt={prize.name}
                    />
                    <img
                        src={`http://localhost:8000/uploads/${prize.image}`}
                        alt={prize.name}
                    />
                    <img
                        src={`http://localhost:8000/uploads/${prize.image}`}
                        alt={prize.name}
                    />
                    <img
                        src={`http://localhost:8000/uploads/${prize.image}`}
                        alt={prize.name}
                    />
                </div>
                <div className="prizedisplay-img">
                    <img className='prizedisplay-main-img'
                        src={`http://localhost:8000/uploads/${prize.image}`}
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
            </div>
          
        </div>
          <div className="play-now-section">
          <PlayNow />
      </div>
      </div>
    );
};

export default PrizesDetail;
