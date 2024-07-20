import React from 'react';
import './styles.css';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works">
       <h2 className="mt-5 pt-4 mb-4 text-center fw-bold h-font">How It Works</h2>
      <p className="text-center">Learn How easy it is to participate and win</p>
      <div className="steps">
        <div className="step">
          <img src="/public/assets/a.jpg" alt="Step 1" />
          <p>Choose a Number</p>
        </div>
        <div className="step">
          <img src="public/assets/a.jpg" alt="Step 2" />
          <p>Pay</p>
        </div>
        <div className="step">
          <img src="public/assets/a.jpg" alt="Step 3" />
          <p>Win Prizes</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;