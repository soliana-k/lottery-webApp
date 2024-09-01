import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPrizes = () => {
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/prizes');
                setPrizes(response.data);
            } catch (err) {
                setError('Failed to fetch prizes. Please try again later.');
                console.error('Error fetching prizes:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrizes();
    }, []);

    // Filter prizes with future draw dates
    const futurePrizes = prizes.filter(prize => new Date(prize.drawDate) > new Date());

    const handleEdit = (id) => {
        // Implement your edit functionality here
        toast.info(`Edit prize with ID: ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/prizes/${id}`);
            setPrizes(prizes.filter(prize => prize._id !== id));
            toast.success('Prize deleted successfully!');
        } catch (err) {
            toast.error('Failed to delete prize.');
            console.error('Error deleting prize:', err);
        }
    };

    return (
        <section className='edit-prizes'>
            <h2 className="mt-5 pt-4 mb-4 text-center fw-bold h-font">Edit Prizes</h2>
            <div className='container'>
                {loading ? (
                    <p className="text-center">Loading prizes...</p>
                ) : error ? (
                    <p className="text-center text-danger">{error}</p>
                ) : futurePrizes.length > 0 ? (
                    <div className='row justify-content-center'>
                        {futurePrizes.map((prize) => (
                            <div key={prize._id} className='col-lg-4 col-md-6 mb-4'>
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
                                        <Button variant="primary" onClick={() => handleEdit(prize._id)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDelete(prize._id)}>Delete</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No future prizes available.</p>
                )}
                <ToastContainer />
            </div>
        </section>
    );
};

export default EditPrizes;
