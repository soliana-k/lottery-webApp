import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminFaq from '../pages/FAQ/AdminFaq'; // Ensure this path is correct

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="faq" element={<AdminFaq />} />
      {/* Other admin routes */}
    </Routes>
  );
};

export default AdminRoutes;
