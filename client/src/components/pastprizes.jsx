import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // Ensure correct Swiper module is imported
import 'swiper/css';
import 'swiper/css/navigation';  // Import Swiper styles for navigation
import './pastprizes.css';  // Custom CSS
import axios from 'axios';

const PastPrizes = () => {
    const [pastPrizes, setPastPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/prizes');
                const prizes = response.data;

                // Filter and sort prizes where the draw date has passed
                const filteredPastPrizes = prizes
                    .filter(prize => new Date(prize.drawDate) < new Date())
                    .sort((a, b) => new Date(b.drawDate) - new Date(a.drawDate));  // Sort by drawDate (recent first)

                setPastPrizes(filteredPastPrizes);
            } catch (err) {
                setError('Failed to fetch past prizes. Please try again later.');
                console.error('Error fetching past prizes:', err);
            } finally {
                setLoading(false);
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
                        spaceBetween={30} // Space between slides
                        slidesPerView={3}  // Display 3 slides per view
                        slidesPerGroup={3} // Move 3 slides per navigation click
                        navigation={true}  // Enable navigation (arrows)
                        loop={false}  // Disable looping to prevent going back to the first prize
                        breakpoints={{
                            640: {
                                slidesPerView: 1, // For small screens, 1 prize at a time
                                slidesPerGroup: 1, // Move 1 slide at a time
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 2, // Medium screens show 2 prizes
                                slidesPerGroup: 2, // Move 2 slides at a time
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3, // For large screens, 3 prizes
                                slidesPerGroup: 3, // Move 3 slides at a time
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
