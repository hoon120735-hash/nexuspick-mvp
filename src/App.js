import React, { useState } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// 상단 네비게이션바 컴포넌트 추가 ✅
function Navbar({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f3f4f6",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {/* 로고 클릭 시 홈으로 이동 */}
      <h1
        onClick={() => navigate("/")}
        style={{
          color: "#4f46e5",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🎬 NexusPick
      </h1>

      {/* 검색창을 오른쪽으로 배치 */}
      <button
        onClick={() => navigate("/search")}
        style={{
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        🔍 검색
      </button>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div style={{ fontFamily: "sans-serif" }}>
          {/* ✅ 상단바 추가 */}
          <Navbar />

          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
