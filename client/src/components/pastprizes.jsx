import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './pastprizes.css';  // Custom CSS

const PastPrizes = () => {
  return (
    <section>
      <div className='container'>
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}        // Space between each slide
          slidesPerView={3}        // 3 slides visible at a time
          navigation               // Enable navigation arrows
          loop={false}             // Disable looping
          breakpoints={{
            640: {
              slidesPerView: 1,    // 1 slide per view on small screens
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,    // 2 slides per view on medium screens
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,    // 3 slides per view on large screens
              spaceBetween: 30,
            }
          }}
        >
          <SwiperSlide>
            <div className="card border-0 shadow">
              <img src='https://swiperjs.com/demos/images/nature-5.jpg' className="card-img-top" alt="Past prize 1" />
              <div className="card-body">
                <p className="card-text">Past prize 1</p>
                <p className="card-winner">Winner: Faiza</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="card border-0 shadow">
              <img src='https://swiperjs.com/demos/images/nature-6.jpg' className="card-img-top" alt="Past prize 2" />
              <div className="card-body">
                <p className="card-text">Past prize 2</p>
                <p className="card-winner">Winner: Faiza</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="card border-0 shadow">
              <img src='https://swiperjs.com/demos/images/nature-4.jpg' className="card-img-top" alt="Past prize 3" />
              <div className="card-body">
                <p className="card-text">Past prize 3</p>
                <p className="card-winner">Winner: Faiza</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="card border-0 shadow">
              <img src='https://swiperjs.com/demos/images/nature-4.jpg' className="card-img-top" alt="Past prize 3" />
              <div className="card-body">
                <p className="card-text">Past prize 4</p>
                <p className="card-winner">Winner: Faiza</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card border-0 shadow">
              <img src='https://swiperjs.com/demos/images/nature-4.jpg' className="card-img-top" alt="Past prize 3" />
              <div className="card-body">
                <p className="card-text">Past prize 5</p>
                <p className="card-winner">Winner: Faiza</p>
              </div>
            </div>
          </SwiperSlide>

          {/* Add more slides as needed */}
        </Swiper>
      </div>
    </section>
  );
}

export default PastPrizes; 