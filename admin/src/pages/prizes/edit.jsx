import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Breadcrumbs from '../../breadcrumb';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './prizes.css';  // Make sure your custom styles are imported

const Edit = () => {
    const [prizeData, setPrizeData] = useState(null);
    const [name, setName] = useState('');
    const [existingImage, setExistingImage] = useState('');  // State to track existing image
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [deadline, setDeadline] = useState('');
    const [drawDate, setDrawDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const prizeId = location.state?.prizeId;

    useEffect(() => {
        if (prizeId) {
            axios.get(`http://localhost:8000/api/v1/prizes/${prizeId}`)
                .then(response => {
                    const prize = response.data;
                    setPrizeData(prize);
                    setName(prize.name);
                    setPrice(prize.price);
                    setDeadline(prize.deadline.split('T')[0]);
                    setDrawDate(prize.drawDate.split('T')[0]);
                    setDescription(prize.description);
                    setExistingImage(prize.image);  // Store existing image
                })
                .catch(err => {
                    console.error('Error fetching prize details:', err);
                    setError('Failed to load prize details. Please try again later.');
                });
        }
    }, [prizeId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
    
        if (!name || !price || !deadline || !drawDate || !description) {
            setError('All fields are required.');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', name);
    
        // Append the new image only if it exists, otherwise append the existing image
        if (image) {
            formData.append('image', image);
        } else {
            formData.append('existingImage', existingImage);  // Append existing image
        }
        
        formData.append('price', price);
        formData.append('deadline', deadline);
        formData.append('drawDate', drawDate);
        formData.append('description', description);
    
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/prizes/${prizeId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('Update response:', response.data);
            toast.success('Prize updated successfully!');
            setTimeout(() => {
                navigate('/prizes/editprize'); // Delay navigation to allow toast to show
            }, 1000); // Wait for 1 second before navigating
        } catch (err) {
            console.error('Error updating prize:', err);
            const errorMessage = err.response?.data?.message || 'Error updating prize.';
            toast.error(errorMessage);
        }
    };
    const handleCancel = () => {
        navigate('/prizes/editprize'); // Navigate back to the Edit Prizes page
    };

    return (
        <div className="content-management-container">
            <div className="prizes-section">
                <h2>Edit Prize</h2>
                {error && <p className="text-danger">{error}</p>}
                {prizeData ? (
                    <form onSubmit={handleUpdate} className="admin-prize-form">
                        <div className="form-group">
                            <label>Prize Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Prize Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Prize Image (Upload new image to change)</label>
                            <input
                                type="file"
                                onChange={e => setImage(e.target.files[0])}
                                accept="image/*"
                            />
                            {/* Display existing image as a preview */}
                            {existingImage && (
                                <div className="image-preview">
                                    <p>Current Image:</p>
                                    <img 
                                        src={`http://localhost:8000/uploads/${existingImage}`} 
                                        alt="Prize" 
                                        style={{ maxWidth: '100%', height: 'auto' }} 
                                    />
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Price"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Deadline</label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={e => setDeadline(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Draw</label>
                            <input
                                type="date"
                                value={drawDate}
                                onChange={e => setDrawDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Description"
                                required
                            />
                        </div>
                        <div className="form-buttons">
                            <Button type="submit" variant="primary" size="sm" className="mr-2">Update Prize</Button>
                            <Button type="button" variant="secondary" size="sm" onClick={handleCancel}>Cancel</Button>
                        </div>
                    </form>
                ) : (
                    <p>Loading prize details...</p>
                )}
            </div>
            {/* ToastContainer with custom class names */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="toast-custom"  // Apply custom CSS for white background
                bodyClassName="toast-custom-body" // Apply custom body style
            />
        </div>
    );
};

export default Edit;
