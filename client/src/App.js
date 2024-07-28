import './App.css';
import Navbar from './components/navbar/navbar';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import How_it_works from './pages/How_it_works';
import Prizes from './pages/Prizes';
import FAQ from './pages/FAQ';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Contact from './pages/Contact';
import MainBanner from './components/MainBanner';
import HowItWorks from './components/HowItWorks';
import FeaturedPrizes from './components/FeaturedPrizes';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ActiveWinners from './components/ActiveWinners';
import UserDashboard from './User/UserDashboard'; // Adjust the import path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Ns from './components/Number-selection/ns';



function App() {
  return (
    <BrowserRouter>
      <div> 
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how_it_works" element={<How_it_works/>} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path='/play' element={<Ns/>}/>

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
        <ActiveWinners />
        <Testimonials />
        <Footer />
      </div>
    );
  }
  
export default App;

