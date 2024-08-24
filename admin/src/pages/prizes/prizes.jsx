import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Breadcrumbs from '../../breadcrumb';
import axios from 'axios';

const Addprizes = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [deadline, setDeadline] = useState('');
    const [drawDate, setDrawDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form data for handling file upload
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('price', price);
        formData.append('deadline', deadline);
        formData.append('drawDate', drawDate);

        try {
            await axios.post('/api/admin/prizes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Clear form after submission
            setName('');
            setImage(null);
            setPrice('');
            setDeadline('');
            setDrawDate('');
        } catch (error) {
            console.error('Error adding new prize:', error);
        }
    };

    const handleCancel = () => {
        // Reset form fields on cancel
        setName('');
        setImage(null);
        setPrice('');
        setDeadline('');
        setDrawDate('');
    };

    return (
        <div className="content-management-container">
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/home' },
                    { label: 'Prizes Management' }
                ]}
            />

            {/* Form to Add New Prize */}
            <div className="prizes-section">
                <h2>Add New Prize</h2>
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
                        <label>Prize Image</label>
                        <input
                            type="file"
                            onChange={e => setImage(e.target.files[0])}
                            accept="image/*"
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
                    <div className="form-buttons">
                        <Button type="submit" variant="success">Add Prize</Button>
                        <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addprizes;
