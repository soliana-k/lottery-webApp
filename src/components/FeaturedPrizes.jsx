import React from 'react';

const FeaturedPrizes = () => {
  return (
    <section>
      <h2 className="mt-5 pt-4 mb-4 text-center fw-bold h-font">Featured Prizes</h2>
      <div className='container'>
      <div className='row'>
        <div className='col-lg-4 col-md-6'>
        <div className="card border-0 shadow" style={{width: '18rem'}}>
       <img src='https://swiperjs.com/demos/images/nature-3.jpg' className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Play now</a>
        </div>
</div>
        </div><div className='col-lg-4 col-md-6'>
        <div className="card border-0 shadow" style={{width: '18rem'}}>
       <img src='https://swiperjs.com/demos/images/nature-2.jpg' className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Play now</a>
        </div>
</div>
        </div>
        <div className='col-lg-4 col-md-6'>
        <div className="card border-0 shadow" style={{width: '18rem'}}>
       <img src='https://swiperjs.com/demos/images/nature-1.jpg' className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Play now</a>
        </div>
</div>
        </div>
        <div className='col-lg-12 text-center mt-5'>
          <a href="#" class="btn btn-sm btn-outline-dark rounded-0 fw-bold shadow-none">More Prizes</a>
        </div>
      </div>
    </div>

    </section>
    
  );
}

export default FeaturedPrizes;