import React from 'react';

const PastPrizes = () => {
  return (
    <section>
      
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className="card border-0 shadow ">
              <img src='https://swiperjs.com/demos/images/nature-5.jpg' className="card-img-top img-fluid" alt="..." />
              <div className="card-body">
                <p className="card-text">Past prize 1</p>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className="card border-0 shadow">
              <img src='https://swiperjs.com/demos/images/nature-6.jpg' className="card-img-top img-fluid" alt="..." />
              <div className="card-body">
                <p className="card-text">Past prize 2</p>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className="card border-0 shadow">
              <img src='https://swiperjs.com/demos/images/nature-4.jpg' className="card-img-top img-fluid" alt="..." />
              <div className="card-body">
                <p className="card-text">Past prize 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PastPrizes;
