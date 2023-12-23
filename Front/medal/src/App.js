// App.js

import React from "react";
import Intro from "./Intro";
import MedalTable from "./Medal";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/medal" element={<MedalTable />} />
        <Route path="/home" element={<Intro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
