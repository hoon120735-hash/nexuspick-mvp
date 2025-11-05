import React, { useState } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
          <h1 style={{ color: "#4f46e5" }}>🎬 NexusPick MVP</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
