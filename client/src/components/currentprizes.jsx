import React, { useState } from 'react';
import Terms from './T&C'; // Adjust the import path as needed
import './styles.css';

const Currentprizes = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <section className='currprize'>

            <h2 className="mt-5 pt-4 mb-4 text-center fw-bold h-font">Featured Prizes</h2>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-4 col-md-6 mb-4 custom-height'>
                        <div className="card border-0 shadow ">
                            <img src='https://swiperjs.com/demos/images/nature-3.jpg' className="card-img-top img-fluid" alt="..." />
                            <div className="card-body">
                                <p className="card-text">
                                 <h5>Table</h5>
                                 Amount:1000br 
                                 Deadline:05/08/2024 
                                 Draw:06/08/2024
                                </p>
                                <button className="btn btn-primary" onClick={handleShow}>Play now</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 mb-4 custom-height'>
                        <div className="card border-0 shadow">
                            <img src='https://swiperjs.com/demos/images/nature-2.jpg' className="card-img-top img-fluid" alt="..." />
                            <div className="card-body">
                            <p className="card-text">
                                 <h5>Table</h5>
                                 Amount:1000br 
                                 Deadline:05/08/2024 
                                 Draw:06/08/2024
                            </p>
                                <button className="btn btn-primary" onClick={handleShow}>Play now</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 mb-4 custom-height'>
                        <div className="card border-0 shadow">
                            <img src='https://swiperjs.com/demos/images/nature-1.jpg' className="card-img-top img-fluid" alt="..." />
                            <div className="card-body">
                            <p className="card-text">
                                 <h5>Table</h5>
                                 Amount:1000br 
                                 Deadline:05/08/2024 
                                 Draw:06/08/2024
                              </p>
                                <button className="btn btn-primary" onClick={handleShow}>Play now</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 mb-4 custom-height'>
                        <div className="card border-0 shadow ">
                            <img src='https://swiperjs.com/demos/images/nature-4.jpg' className="card-img-top img-fluid" alt="..." />
                            <div className="card-body">
                              <p className="card-text">
                                 <h5>Table</h5>
                                 Amount:1000br 
                                 Deadline:05/08/2024 
                                 Draw:06/08/2024
                              </p>
                                <button className="btn btn-primary" onClick={handleShow}>Play now</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 mb-4 custom-height'>
                        <div className="card border-0 shadow ">
                            <img src='https://swiperjs.com/demos/images/nature-5.jpg' className="card-img-top img-fluid" alt="..." />
                            <div className="card-body">
                              <p className="card-text">
                                 <h5>Table</h5>
                                 Amount:1000br 
                                 Deadline:05/08/2024 
                                 Draw:06/08/2024
                              </p>
                                <button className="btn btn-primary" onClick={handleShow}>Play now</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 mb-4 custom-height'>
                        <div className="card border-0 shadow ">
                            <img src='https://swiperjs.com/demos/images/nature-6.jpg' className="card-img-top img-fluid" alt="..." />
                            <div className="card-body">
                              <p className="card-text">
                                 <h5>Table</h5>
                                 Amount:1000br 
                                 Deadline:05/08/2024 
                                 Draw:06/08/2024
                              </p>
                                <button className="btn btn-primary" onClick={handleShow}>Play now</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 mb-4 custom-height'>
                        <div className="card border-0 shadow ">
                            <img src='https://swiperjs.com/demos/images/nature-6.jpg' className="card-img-top img-fluid" alt="..." />
                            <div className="card-body">
                              <p className="card-text">
                                 <h5>Table</h5>
                                 Amount:1000br 
                                 Deadline:05/08/2024 
                                 Draw:06/08/2024
                              </p>
                                <button className="btn btn-primary" onClick={handleShow}>Play now</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 mb-4 custom-height'>
                        <div className="card border-0 shadow ">
                            <img src='https://swiperjs.com/demos/images/nature-6.jpg' className="card-img-top img-fluid" alt="..." />
                            <div className="card-body">
                              <p className="card-text">
                                 <h5>Table</h5>
                                 Amount:1000br 
                                 Deadline:05/08/2024 
                                 Draw:06/08/2024
                              </p>
                                <button className="btn btn-primary" onClick={handleShow}>Play now</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 mb-4 custom-height'>
                        <div className="card border-0 shadow ">
                            <img src='https://swiperjs.com/demos/images/nature-6.jpg' className="card-img-top img-fluid" alt="..." />
                            <div className="card-body">
                              <p className="card-text">
                                 <h5>Table</h5>
                                 Amount:1000br 
                                 Deadline:05/08/2024 
                                 Draw:06/08/2024
                              </p>
                                <button className="btn btn-primary" onClick={handleShow}>Play now</button>
                            </div>
                        </div>
                    </div>
                    <Terms showModal={showModal} handleClose={handleClose} />
                </div>
            </div>
        </section>
    );
};

export default Currentprizes;
