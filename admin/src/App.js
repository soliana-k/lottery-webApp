import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import FAQ from "./pages/FAQ/AdminFaq"; // Ensure this path is correct
import AdminRoutes from "./routes/AdminRoutes"; // Ensure this path is correct

import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} /> 
              <Route path="new" element={<New />} />
            </Route>
            <Route path="prizes">
              <Route index element={<List />} />
              <Route path=":prizeId" element={<Single />} /> 
              <Route path="new" element={<New />} />
            </Route>
          </Route>
          <Route path="/admin/*" element={<AdminRoutes />} /> 
          <Route path="/faq" element={<FAQ />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
