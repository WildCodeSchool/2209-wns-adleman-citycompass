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
          <Route path="/cities/:cityId" element={<City />} />
          <Route path="/places/:placeId" element={<Place />} />
          <Route path="/account/:userId" element={<Account />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
