import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Breadcrumbs from '../../breadcrumb';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './prizes.css';

const AddPrizes = () => {
    // Form state variables
    const [name, setName] = useState('');
    const [mainImage, setMainImage] = useState(null); // Main image
    const [additionalImages, setAdditionalImages] = useState([]); // Array to hold 3 additional images
    const [price, setPrice] = useState('');
    const [deadline, setDeadline] = useState('');
    const [drawDate, setDrawDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Get the current date (without time) for comparison
        const currentDate = new Date().setHours(0, 0, 0, 0);
        const inputDeadline = new Date(deadline).setHours(0, 0, 0, 0);
        const inputDrawDate = new Date(drawDate).setHours(0, 0, 0, 0);

        // Basic validation
        if (!name || !mainImage || additionalImages.length < 3 || !price || !deadline || !drawDate || !description) {
            setError('All fields, including all images, are required.');
            return;
        }

        // Date validation: Check if the deadline or draw date is in the past
        if (inputDeadline < currentDate) {
            setError('The deadline date has already passed. Please enter a valid date.');
            return;
        }

        if (inputDrawDate < currentDate) {
            setError('The draw date has already passed. Please enter a valid date.');
            return;
        }

        // Create FormData for file and form field submission
        const formData = new FormData();
        formData.append('name', name);
        formData.append('mainImage', mainImage);
        additionalImages.forEach((image, index) => {
            formData.append(`additionalImages${index + 1}`, image);
        });
        formData.append('price', price);
        formData.append('deadline', deadline);
        formData.append('drawDate', drawDate);
        formData.append('description', description);

        try {
            // Send POST request to server
            await axios.post('http://localhost:8000/api/v1/prizes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Show success notification
            toast.success('Prize added successfully!');

            setTimeout(() => {
                navigate('/prizes'); // Delay navigation to allow toast to show
            }, 1000); // Wait for 1 second before navigating

        } catch (err) {
            // Show error notification if submission fails
            const errorMessage = err.response?.data?.message || 'Error adding new prize.';
            toast.error(errorMessage);
            console.error('Error adding new prize:', err);
        }
    };

    // Handle file input changes for images
    const handleMainImageChange = (e) => {
        setMainImage(e.target.files[0]); // Store the main image file
    };

    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setAdditionalImages(files); // Store additional image files
    };

    // Reset form function
    const resetForm = () => {
        setName('');
        setMainImage(null);
        setAdditionalImages([]);
        setPrice('');
        setDeadline('');
        setDrawDate('');
        setError(''); // Clear error state
        setDescription('');
    };

    // Handle cancel button click
    const handleCancel = () => {
        resetForm(); // Reset form fields on cancel
    };

    return (
        <div className="content-management-container">
            {/* Form to Add New Prize */}
            <div className="prizes-section">
                <h2>Add New Prize</h2>
                {error && <p className="text-danger">{error}</p>} {/* Display any errors */}
                <form onSubmit={handleSubmit} className="admin-prize-form">
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
                        <label>Main Image</label>
                        <input
                            type="file"
                            onChange={handleMainImageChange}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Additional Images (3 required)</label>
                        <input
                            type="file"
                            onChange={handleAdditionalImagesChange}
                            accept="image/*"
                            multiple
                            required
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
                        <Button type="submit" variant="primary" size="sm" className="mr-2">Add Prize</Button>
                        <Button type="button" variant="secondary" size="sm" onClick={handleCancel}>Cancel</Button>
                    </div>
                </form>
            </div>
            {/* Toast Notification Container */}
            <ToastContainer />
        </div>
    );
};

export default AddPrizes;
