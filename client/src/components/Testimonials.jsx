import Swiper from 'swiper/bundle'; 
import React, { useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import './styles.css';


const  Testimonials = () => {
  useEffect(() => {
    const swiper = new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto', // Default value that will be overridden by breakpoints
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      breakpoints: {
        // when window width is <= 767px (mobile devices)
        767: {
          slidesPerView: 2,
        },
        // when window width is >= 768px (tablet and up)
        768: {
          slidesPerView: 4,
        },
      },
    });

    return () => {
      swiper.destroy(); 
    };
  }, []); 

  return (
    <div>
    <h2 className=" test mt-5 pt-4 mb-4 text-center fw-bold h-font">TESTIMONIALS</h2>
   <div className="swiper mySwiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide bg-white p-4  ">
          <div className="profile d-flex  align-items-center m-4">
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="slide2" />
            <h6 className=" ms-4 ">Faiza</h6>
          </div>
          <p>I never thought I'd win, but Double B Website made it possible! Thank you for changing my life!</p>
        </div>
        <div className="swiper-slide bg-white p-4 ">
          <div className="profile d-flex  align-items-center m-4"> 
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="slide3" />
            <h6 className=" ms-4 ">Feven</h6>
          </div>
          <p>I've tried many lotteries, but Double B Website is by far the best. Quick payouts and great customer support!</p>
        </div>
        <div className="swiper-slide bg-white p-4  ">
          <div className="profile d-flex  align-items-center m-4">
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="slide1" />
            <h6 className=" ms-4 ">Fatuma</h6>
          </div>
          <p>Playing at Double B Website is not just about winning; it's about the thrill and excitement. Highly recommended!</p>
        </div>
        <div className="swiper-slide bg-white p-4  ">
          <div className="profile d-flex  align-items-center m-4">
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="slide3" />
            <h6 className=" ms-4 ">Feben</h6>
          </div>
          <p>With Double B Website, I've won multiple times! It's my go-to place for fun and potential big wins.</p>
        </div>
        
        <div className="swiper-slide bg-white p-4  ">
          <div className="profile d-flex  align-items-center m-4">
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="slide2" />
            <h6 className=" ms-4 ">Kalkidan</h6>
          </div>
          <p>The variety of games and the easy-to-use interface at Double B Website keep me coming back. It's addictive!</p>
        </div>
        <div className="swiper-slide bg-white p-4  ">
          <div className="profile d-flex  align-items-center m-4">
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="slide2" />
            <h6 className=" ms-4 ">Faiza</h6>
          </div>
          <p>I never thought I'd win, but Double B Website made it possible! Thank you for changing my life!</p>
        </div>
        <div className="swiper-slide bg-white p-4  ">
          <div className="profile d-flex  align-items-center m-4">
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="slide3" />
            <h6 className=" ms-4 ">Feven</h6>
          </div>
          <p>I've tried many lotteries, but [Your Lottery Website] is by far the best. Quick payouts and great customer support!</p>
        </div>
        <div className="swiper-slide bg-white p-4  ">
          <div className="profile d-flex  align-items-center m-4">
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="slide1" />
            <h6 className=" ms-4 ">Fatuma</h6>
          </div>
          <p>Playing at [Your Lottery Website] is not just about winning; it's about the thrill and excitement. Highly recommended!</p>
        </div>
        <div className="swiper-slide bg-white p-4  ">
          <div className="profile d-flex  align-items-center m-4">
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="slide3" />
            <h6 className=" ms-4 ">Feben</h6>
          </div>
          <p>With [Your Lottery Website], I've won multiple times! It's my go-to place for fun and potential big wins.</p>
        </div>
        <div className="swiper-slide bg-white p-4  ">
          <div className="profile d-flex  align-items-center m-4">
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="slide2" />
            <h6 className=" ms-4 ">Kalkidan</h6>
          </div>
          <p>The variety of games and the easy-to-use interface at [Your Lottery Website] keep me coming back. It's addictive!</p>
        </div>
        
        
      </div>
      <div className="swiper-pagination"></div>
    </div>
    </div>
  );
};

export default Testimonials;