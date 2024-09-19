import React from 'react';
import CurrentDraw from '../components/CurrentDraw';
import PastResults from '../components/PastResults';
import WinnerAnnouncements from '../components/WinnerAnnouncements';
import Footer from '../components/Footer';
function DrawResultsPage() {
  return (
    <div>
      
      <CurrentDraw/>
      <PastResults />
      {/* <WinnerAnnouncements /> */}
      <Footer />
    </div>
  );
}

export default DrawResultsPage;
