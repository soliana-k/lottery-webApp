import React from 'react';

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <div className="testimonial-list">
        <div className="testimonial">
          <blockquote>"Quote from past winner."</blockquote>
          <p>User rating: 5 stars</p>
        </div>
        <div className="testimonial">
          <blockquote>"Another quote from past winner."</blockquote>
          <p>User rating: 4 stars</p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;