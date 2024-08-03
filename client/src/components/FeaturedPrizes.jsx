import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const FeaturedPrizes = () => {
  return (
    <section className='feturedPrize'>
      
      <h2 className="mt-5 pt-4 mb-4 text-center fw-bold h-font">Featured Prizes</h2>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className="card border-0 shadow ">
              <img src='https://swiperjs.com/demos/images/nature-3.jpg' className="card-img-top img-fluid" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Play now</a>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className="card border-0 shadow">
              <img src='https://swiperjs.com/demos/images/nature-2.jpg' className="card-img-top img-fluid" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Play now</a>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className="card border-0 shadow">
              <img src='https://swiperjs.com/demos/images/nature-1.jpg' className="card-img-top img-fluid" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Play now</a>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12 text-center mt-5'>
          <Link to="/Prizes" className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
              <button className="btn btn-sm btn-outline-dark rounded-0 fw-bold shadow-none mb-5">More Prizes</button>
          </Link>

          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedPrizes;
