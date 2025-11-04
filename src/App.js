import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
        <h1 style={{ color: "#4f46e5" }}>🎬 NexusPick MVP</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
