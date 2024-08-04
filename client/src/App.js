import './App.css';
import './components/styles.css';
import Navbar from './components/navbar/navbar';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import How_it_works from './pages/How_it_works';
import Prizes from './pages/Prizes';
import FAQ from './pages/FAQ';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

import SignIn from './pages/SignIn';
import Contact from './pages/Contact';
import MainBanner from './components/MainBanner';
import HowItWorks from './components/HowItWorks';
import FeaturedPrizes from './components/FeaturedPrizes';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ActiveWinners from './components/ActiveWinners';
import UserDashboard from './User/UserDashboard';
import Ns from './components/Number-selection/NumSelection';
import CurrentDraw from './components/CurrentDraw';
import PastResults from './components/PastResults';
import WinnerAnnouncements from './components/WinnerAnnouncements';
import DrawResultsPage from './pages/DrawResultsPage';
// import Profile from './User/Profile';
// import Settings from './User/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';




function App() {
  return (
    <BrowserRouter>
      <div> 
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how_it_works" element={<How_it_works />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/play" element={<Ns />} />
          <Route path="/current_draw" element={<CurrentDraw />} />
          <Route path="/past_results" element={<PastResults />} />
          <Route path="/winner_announcements" element={<WinnerAnnouncements />} />
          <Route path="/draw_results" element={<DrawResultsPage />} />
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />New route */}

          
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
