import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works">
      <h2>How It Works</h2>
      <p>Brief explanation of the process...</p>
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
