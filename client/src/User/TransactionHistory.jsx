import React, { useState, useEffect } from 'react';
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopNavigationBar from './UserDashboard.jsx';
import axios from 'axios';

const Transaction = () => {
    // State for transactions and other UI states
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const location = useLocation(); // Use location to determine the current path

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transactions');
                setTransactions(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load transactions');
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    // Filter transactions based on the filter input
    const filteredTransactions = transactions.filter(transaction =>
        transaction.status.toLowerCase().includes(filter.toLowerCase())
    );

    // Only render this component if the path is '/transaction'
    if (location.pathname === '/transaction') {
        return (
            <>
                <Sidebar />
                <div className="main-content">
                    <TopNavigationBar />
                    <main className="setting-main">
                        {/* Setting header */}
                        <div className="setting-header">
                            <h1 className="setting-header-title">Transaction History</h1>
                        </div>

                        {/* Render loading, error, or the transaction table */}
                        {loading ? (
                            <p>Loading transactions...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.map(transaction => (
                                        <tr key={transaction._id}>
                                            <td>{transaction._id}</td>
                                            <td>{transaction.description}</td>
                                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                            <td>{transaction.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </main>
                </div>
            </>
        );
    } else {
        return null;
    }
};

export default Transaction;
