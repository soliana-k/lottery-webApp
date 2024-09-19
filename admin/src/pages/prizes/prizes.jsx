import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './prizes.css';

const AddPrizes = () => {
    const [name, setName] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [additionalImage1, setAdditionalImage1] = useState(null);
    const [additionalImage2, setAdditionalImage2] = useState(null);
    const [additionalImage3, setAdditionalImage3] = useState(null);
    const [price, setPrice] = useState('');
    const [deadline, setDeadline] = useState('');
    const [drawDate, setDrawDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const currentDate = new Date().setHours(0, 0, 0, 0);
        const inputDeadline = new Date(deadline).setHours(0, 0, 0, 0);
        const inputDrawDate = new Date(drawDate).setHours(0, 0, 0, 0);

        if (!name || !mainImage || !additionalImage1 || !additionalImage2 || !additionalImage3 || !price || !deadline || !drawDate || !description) {
            setError('All fields, including all images, are required.');
            return;
        }

        if (inputDeadline < currentDate || inputDrawDate < currentDate) {
            setError('The deadline or draw date has already passed.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('mainImage', mainImage);
        formData.append('additionalImage1', additionalImage1);
        formData.append('additionalImage2', additionalImage2);
        formData.append('additionalImage3', additionalImage3);
        formData.append('price', price);
        formData.append('deadline', deadline);
        formData.append('drawDate', drawDate);
        formData.append('description', description);

        try {
            await axios.post('http://localhost:8000/api/v1/prizes', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Prize added successfully!');

            setTimeout(() => {
                navigate('/prizes');
            }, 1000);

        } catch (err) {
            toast.error(err.response?.data?.message || 'Error adding prize.');
        }
    };

    const handleImageChange = (setImage) => (e) => {
        setImage(e.target.files[0]);
    };

    const resetForm = () => {
        setName('');
        setMainImage(null);
        setAdditionalImage1(null);
        setAdditionalImage2(null);
        setAdditionalImage3(null);
        setPrice('');
        setDeadline('');
        setDrawDate('');
        setDescription('');
        setError('');
    };

    return (
        <div className="content-management-container">
            <div className="prizes-section">
                <h2>Add New Prize</h2>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit} className="admin-prize-form">
                    <div className="form-group">
                        <label>Prize Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Prize Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Main Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange(setMainImage)}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Additional Image 1</label>
                        <input
                            type="file"
                            onChange={handleImageChange(setAdditionalImage1)}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Additional Image 2</label>
                        <input
                            type="file"
                            onChange={handleImageChange(setAdditionalImage2)}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Additional Image 3</label>
                        <input
                            type="file"
                            onChange={handleImageChange(setAdditionalImage3)}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Deadline</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Draw Date</label>
                        <input
                            type="date"
                            value={drawDate}
                            onChange={(e) => setDrawDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Prize Description"
                            required
                        ></textarea>
                    </div>
                    <Button type="submit">Add Prize</Button>
                    <Button type="button" variant="secondary" onClick={resetForm}>Reset Form</Button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddPrizes;
