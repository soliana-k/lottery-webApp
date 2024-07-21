
import './App.css';
import NavBar from './components/howitworks/nav/nav';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import How_it_works from './pages/How_it_works';
import Prizes from './pages/Prizes';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import MainBanner from './components/MainBanner';
import HowItWorks from './components/HowItWorks';
import FeaturedPrizes from './components/FeaturedPrizes';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div> 
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how_it_works" element={<How_it_works/>} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
  function HomePage(){
    return (
      <div>
        <MainBanner />
        <HowItWorks />
        <FeaturedPrizes />
        <Testimonials />
        <Footer />
      </div>
    );
  }
  
export default App;

