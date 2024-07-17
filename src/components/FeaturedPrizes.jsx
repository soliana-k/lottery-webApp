import React from 'react';

const FeaturedPrizes = () => {
  return (
    <section id="prizes" className="featured-prizes">
      <h2>Featured Prizes</h2>
      <div className="prize-list">
        <div className="prize">
          <img src="/public/assets/a.jpg" alt="Prize 1" />
          <p>Description of Prize 1</p>
          <a href="#prize1">View Details</a>
        </div>
        <div className="prize">
          <img src="/public/assets/a.jpg" alt="Prize 2" />
          <p>Description of Prize 2</p>
          <a href="#prize2">View Details</a>
        </div>
      </div>
    </section>
  );
}

export default FeaturedPrizes;