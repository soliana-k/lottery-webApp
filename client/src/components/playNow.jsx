import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './pastprizes.css';  // Custom CSS
import { FaHandPointer } from 'react-icons/fa';

const PlayNow = ({ prize }) => {
    const selectedNumber = 38; // Example selected number
    const price = prize.price || 0; // Use the prize's price if available, otherwise 0

    const rows = [
        Array.from({ length: 13 }, (_, i) => i),
        Array.from({ length: 13 }, (_, i) => i + 13),
        Array.from({ length: 13 }, (_, i) => i + 26),
        Array.from({ length: 13 }, (_, i) => i + 39),
        Array.from({ length: 13 }, (_, i) => i + 52),
        Array.from({ length: 11 }, (_, i) => i + 65),
        Array.from({ length: 5 }, (_, i) => i + 76),
    ];

    return (
        <div className="playnow-container">
            <div className="number-selection">
                <div className="selection-instruction">
                    <h3>Choose your numbers</h3>
                </div>
                <div className="number-grid">
                    {rows.map((row, rowIndex) => (
                        <div key={rowIndex} className={`number-row ${rowIndex >= 5 ? 'decreased' : ''}`}>
                            {row.map(num => (
                                <div
                                    key={num}
                                    className={`number-circle ${selectedNumber === num ? 'selected' : ''}`}
                                >
                                    {num}
                                    {num === selectedNumber && (
                                        <div className="icon-wrapper">
                                            <FaHandPointer className="icon-highlight" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="prize-summary-table">
                <h3>Prize Summary</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Prize Image</th>
                            <th>Price</th>
                            <th>Picked Number</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src={`http://localhost:8000/uploads/${prize.image}`} alt="Prize" className="prize-thumbnail" /></td>
                            <td>{price} br</td>
                            <td>{selectedNumber}</td>
                            <td>{price} br</td> {/* Assuming the subtotal is the same as the price for a single picked number */}
                        </tr>
                    </tbody>
                </table>
                <div className="checkout-button-container">
                    <button className="checkout-button">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default PlayNow;
