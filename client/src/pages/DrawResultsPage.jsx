import React from 'react';
import CurrentDraw from '../components/CurrentDraw';
import PastResults from '../components/PastResults';
import WinnerAnnouncements from '../components/WinnerAnnouncements';

function DrawResultsPage() {
  return (
    <div>
      <CurrentDraw />
      <PastResults />
      <WinnerAnnouncements />
    </div>
  );
}

export default DrawResultsPage;
