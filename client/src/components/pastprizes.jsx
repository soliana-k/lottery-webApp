import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './pastprizes.css';  // Custom CSS
import axios from 'axios';

const PastPrizes = () => {
    const [pastPrizes, setPastPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/prizes'); // Fetch all prizes
                const prizes = response.data;

                // Step 3: Filter for prizes with passed draw dates
                const filteredPastPrizes = prizes.filter(prize => new Date(prize.drawDate) <= new Date());
                setPastPrizes(filteredPastPrizes);
            } catch (err) {
                setError('Failed to fetch past prizes. Please try again later.');
                console.error('Error fetching past prizes:', err);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchPrizes();
    }, []);

    return (
        <section>
            <div className='container'>
                {loading ? (
                    <p className="text-center">Loading past prizes...</p>
                ) : error ? (
                    <p className="text-center text-danger">{error}</p>
                ) : pastPrizes.length > 0 ? (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={3}
                        navigation
                        loop={false}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            }
                        }}
                    >
                        {pastPrizes.map((prize) => (
                            <SwiperSlide key={prize._id}>
                                <div className="card border-0 shadow">
                                    <img 
                                        src={`http://localhost:8000/uploads/${prize.image}`} 
                                        className="card-img-top" 
                                        alt={prize.name} 
                                    />
                                    <div className="card-body">
                                        <p className="card-text">{prize.name}</p>
                                        <p className="card-winner">
                                            Draw Date: {new Date(prize.drawDate).toLocaleDateString()} <br />
                                            Price: {prize.price} br <br />
                                            Winner: {prize.winner || 'To be announced'}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-center">No past prizes available at the moment.</p>
                )}
            </div>
        </section>
    );
};

export default PastPrizes;
