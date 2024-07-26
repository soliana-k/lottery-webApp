import React from 'react';
import './NumberSelection.css';
import { FaHandPointer } from 'react-icons/fa';

const NumberSelection = () => {
    const selectedNumber = 38;
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
        <div className="number-selection">
            <h2>Lottery Game</h2>
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
            <div className="selection-instruction">
                <h3>Choose your numbers</h3>
            </div>
        </div>
        
    );
};

export default NumberSelection;
