import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import City from "./pages/City";
import Place from "./pages/Place";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";

import "./styles/Global.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities/:cityId" element={<City />} />
          <Route path="/cities/:cityId/:placeId" element={<Place />} />
          <Route path="/account/:userId" element={<Account />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
