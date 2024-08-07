import React from 'react';
import './styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const HowItWorks = () => {
  return (
    <section id="how-it-work" className="how-it-work">
      
       <h2 className="mt-5 pt-4 mb-4 text-center fw-bold h-font">How It Works</h2>
      <p className="text-center">Learn How easy it is to participate and win</p>
      <div className="row justify-content-center text-center">
      <div className="col-3 text-center">
      <i className="bi bi-hand-index-thumb"></i>
      <p>Choose a Number</p>
      </div>
      <div className="col-3 text-center">
      <i class="bi bi-currency-exchange"></i>
      <p>Pay</p>
      </div>
      <div className="col-3 text-center">
      <i className="bi bi-trophy"></i>
      <p>Win Prizes</p>
      </div>
    
  </div>
</section>
  );
}

export default HowItWorks;