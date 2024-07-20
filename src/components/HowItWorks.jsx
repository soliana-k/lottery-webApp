import React from 'react';
import './styles.css';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="contianer-fluid py-5">
       <h2 className="mt-5 pt-4 mb-4 text-center fw-bold h-font">How It Works</h2>
      <p className="text-center">Learn How easy it is to participate and win</p>
      <div className="row text-center">
      <div className="col-3 text-center">
      <i className="bi bi-hand-index-thumb"></i>
      <p>Choose a Number</p>
      </div>
      <div className="col-3 text-center">
      <i className="bi bi-trophy"></i>

        <p>Pay</p>
      </div>
      <div className="col-3 text-center">
      <i className="bi bi-trophy"></i>
        <p>Win Prizes</p>
      </div>
    </div>
  </div>
</section>
  );
}

export default HowItWorks;