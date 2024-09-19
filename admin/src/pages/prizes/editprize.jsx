import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '../../breadcrumb'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS
import './editprize.css'; // Import the new CSS file


const EditPrizes = () => {
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [prizeToDelete, setPrizeToDelete] = useState(null);
    const navigate = useNavigate(); // Initialize the useNavigate hook

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
      // Navigate to the edit page, passing the prize ID as a state
      navigate(`/prizes/edit`, { state: { prizeId: id } });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/prizes/${prizeToDelete}`);
            setPrizes(prizes.filter(prize => prize._id !== prizeToDelete));
            setShowModal(false); // Close the modal
            toast.success('Prize deleted successfully!');
        } catch (err) {
            toast.error('Failed to delete prize.');
            console.error('Error deleting prize:', err);
        }
    };

    return (
        <section className='edit-prizes'>
            {/* Breadcrumbs */}
            <Breadcrumbs 
                items={[
                  { label: 'Home', href: '/home' },
                  { label: 'Prizes Management', href: '/prizes' },
                  { label: 'Modify Prizes' }
                ]}
            />
            <h2>Modify Prizes</h2>
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
                                        src={`http://localhost:8000/uploads/${prize.mainImage}`} 
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
                                        <div className="button-group">
                                            <Button className="btn-sm1" onClick={() => handleEdit(prize._id)}>Edit</Button>
                                            <Button 
                                                className="btn-sm2"
                                                onClick={() => {
                                                    setPrizeToDelete(prize._id);
                                                    setShowModal(true);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No future prizes available.</p>
                )}

                {/* Confirmation Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} className="edit-prizes-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this prize?</Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-sm1" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button className="btn-sm2" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <ToastContainer />
            </div>
        </section>
    );
};

export default EditPrizes;
