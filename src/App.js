import React, { useState } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// ✅ 상단 네비게이션바 컴포넌트
function Navbar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  // Enter 키로 검색 기능
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
    }
  };

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
      {/* 🎬 로고 클릭 시 홈으로 이동 */}
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

      {/* 🔍 오른쪽 검색창 (Enter 입력으로 검색 실행) */}
      <input
        type="text"
        placeholder="감독 또는 영화 제목 검색"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "8px 12px",
          width: "220px",
        }}
      />
    </div>
  );
}

// ✅ 메인 앱
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <div style={{ fontFamily: "sans-serif" }}>
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
