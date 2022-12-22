import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import City from "./pages/City";
import Place from "./pages/Place";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities/:cityName" element={<City />} />
          <Route path="/cities/:cityName/:placeId" element={<Place />} />
          <Route path="/account/:userId" element={<Account />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
