import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import City from "./pages/City";
import Place from "./pages/Place";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Cities from "./pages/Cities";

import "./index.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const currentLocation = useLocation();

  return (
    <>
      <Toaster position="bottom-center" />
      <main>
        {currentLocation.pathname.includes("dashboard/") ? (
          <Routes>
            <Route path="/dashboard/:userId" element={<Dashboard />} />
          </Routes>
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cities" element={<Cities />} />
              <Route path="/cities/:cityName" element={<City />} />
              <Route path="/cities/:cityName/:placeName" element={<Place />} />
              <Route path="/account/:userId" element={<Account />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </>
        )}
      </main>
    </>
  );
}

export default App;
