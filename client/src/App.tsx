import React from "react";
import { Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <main>
        <p>Coucou !!</p>
        <Routes></Routes>
      </main>
    </>
  );
}

export default App;
