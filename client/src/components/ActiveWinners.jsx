import React from 'react';
import './styles.css';

const ActiveWinners = () => {
    return (
        <div className="main-banner">
            <div className="banner">
                <div className="banner-text text-center">
                    <h2 className="mt-3 pt-2 mb-4 fw-bold h-font">Active Winners in 24hrs</h2>
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-2 col-md-3 col-4">
                                <div className="card border-0 circle" style={{ width: '4rem', height: '4rem', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
                                    <img src='https://swiperjs.com/demos/images/nature-3.jpg' className="card-img-top img-fluid" alt="Winner 1" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-4">
                                <div className="card border-0 shadow" style={{ width: '4rem', height: '4rem', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
                                    <img src='https://swiperjs.com/demos/images/nature-2.jpg' className="card-img-top img-fluid" alt="Winner 2" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-4">
                                <div className="card border-0 shadow" style={{ width: '4rem', height: '4rem', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
                                    <img src='https://swiperjs.com/demos/images/nature-1.jpg' className="card-img-top img-fluid" alt="Winner 3" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-4">
                                <div className="card border-0 circle" style={{ width: '4rem', height: '4rem', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
                                    <img src='https://swiperjs.com/demos/images/nature-3.jpg' className="card-img-top img-fluid" alt="Winner 4" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-4">
                                <div className="card border-0 circle" style={{ width: '4rem', height: '4rem', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
                                    <img src='https://swiperjs.com/demos/images/nature-1.jpg' className="card-img-top img-fluid" alt="Winner 5" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-4">
                                <div className="card border-0 circle" style={{ width: '4rem', height: '4rem', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
                                    <img src='https://swiperjs.com/demos/images/nature-2.jpg' className="card-img-top img-fluid" alt="Winner 6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActiveWinners;
