import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Breadcrumbs from '../../breadcrumb';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './prizes.css';

const Edit = () => {
    const [prizeData, setPrizeData] = useState(null);
    const [name, setName] = useState('');
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
        if (image) formData.append('image', image);
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
            console.log('Triggering success toast...');
            toast.success('Prize updated successfully!');
            navigate('/prizes/editprize');
        } catch (err) {
            console.error('Error updating prize:', err);
            const errorMessage = err.response?.data?.message || 'Error updating prize.';
            console.log('Triggering error toast...');
            toast.error(errorMessage);
        }
    };

    const resetForm = () => {
        if (prizeData) {
            setName(prizeData.name);
            setImage(null);
            setPrice(prizeData.price);
            setDeadline(prizeData.deadline.split('T')[0]);
            setDrawDate(prizeData.drawDate.split('T')[0]);
            setDescription(prizeData.description);
            setError('');
        }
    };

    return (
        <div className="content-management-container">
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/home' },
                    { label: 'Prizes Management', href: '/prizes' },
                    { label: 'Modify Prizes', href: "/prizes/editprize" },
                    { label: 'Edit Prize' }
                ]}
            />
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
                            <Button type="button" variant="secondary" size="sm" onClick={resetForm}>Reset</Button>
                        </div>
                    </form>
                ) : (
                    <p>Loading prize details...</p>
                )}
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Edit;
