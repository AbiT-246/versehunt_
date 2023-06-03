import React from "react";
import Poem from "./Pages/Poem";
import Homepage from "./Pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchBar from "./Components/searchBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Poem/:title" element={<Poem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
