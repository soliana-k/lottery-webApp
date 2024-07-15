import React from 'react';
import Header from './components/Header';
import MainBanner from './components/MainBanner';
import HowItWorks from './components/HowItWorks';
import FeaturedPrizes from './components/FeaturedPrizes';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <MainBanner />
      <HowItWorks />
      <FeaturedPrizes />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
