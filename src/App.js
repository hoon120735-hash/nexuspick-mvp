// src/App.js
import React, { useState } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";
import Login from "./components/Login";
import MyPage from "./components/MyPage";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// ✅ 상단 네비게이션바
function Navbar({ username }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

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
      {/* 로고 */}
      <h1
        onClick={() => navigate("/")}
        style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "bold" }}
      >
        🎬 NexusPick
      </h1>

      {/* 검색창 + 내정보 */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {username && <span style={{ fontWeight: "bold" }}>{username}님 👋</span>}
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
        <button
          onClick={() => navigate("/mypage")}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          내 정보
        </button>
      </div>
    </div>
  );
}

// ✅ 메인 앱
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Router>
      {!isLoggedIn ? (
        <Login
          onLogin={(id) => {
            setUsername(id);
            setIsLoggedIn(true);
          }}
        />
      ) : (
        <div style={{ fontFamily: "sans-serif" }}>
          <Navbar username={username} />
          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home username={username} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:id" element={<MovieDetail userId={username} />} />
              <Route path="/mypage" element={<MyPage username={username} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
