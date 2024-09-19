import './App.css';
import './components/styles.css';
import Navbar from './components/navbar/navbar';
import EditProfile from './components/navbar/editProfile';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import axios from 'axios';
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
import PlayPage from './components/Number-selection/NumSelection';
import CurrentDraw from './components/CurrentDraw';
import PrizesDetail from './components/PrizesDetail';
import Payment from './components/payment';
import playNow from './components/playNow';
import PastResults from './components/PastResults';
import WinnerAnnouncements from './components/WinnerAnnouncements';
import DrawResultsPage from './pages/DrawResultsPage';
import Profile from './User/Profile';
import Settings from './User/Settings';
import Transaction from './User/TransactionHistory'
import UserEditProfile from './User/Settings/EditProfile';
import UserInfoForm from './User/Settings/ProfileInfo';
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
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/play/:id" element={<PlayPage />} />

          
          <Route path="/current_draw" element={<CurrentDraw />} />
          <Route path="/prizes-detail" element={<PrizesDetail />} />
          <Route path="/past_results" element={<PastResults />} />
          <Route path="/winner_announcements" element={<WinnerAnnouncements />} />
          <Route path="/draw_results" element={<DrawResultsPage />} />
          <Route path="/prizes-detail/:id" element={<PrizesDetail />} />
          <Route path="/playNow" element={<playNow />} />
          <Route path="/pay" element={<Payment />} />
          <Route path="/playNow/:id" element={<playNow />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/user-edit-profile" element={<UserEditProfile />} />
          <Route path="/user-info-form" element={<UserInfoForm />} />

         

        </Routes>
      </div>
    </BrowserRouter>
  );
}

function HomePage() {
  const [fontSize, setFontSize] = useState('16px');
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/v1/settings?type=homepage');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFontSize(data.fontSize || '16px');
        setBgColor(data.bgColor || '#ffffff');
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);
  return (
    <div style={{ fontSize: fontSize, backgroundColor: bgColor }}>
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
