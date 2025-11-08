import React, { useState } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";
import Login from "./components/Login";
import MyPage from "./components/MyPage"; // ✅ 마이페이지 import
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// ✅ 상단 네비게이션바 컴포넌트
function Navbar({ username }) {
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

      {/* 오른쪽 영역 (로그인 정보 + 검색창 + 내 정보 버튼) */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* 로그인한 사용자 이름 표시 */}
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
  const [username, setUsername] = useState(""); // ✅ 로그인한 아이디 저장

  return (
    <Router>
      {!isLoggedIn ? (
        <Login
          onLogin={(id) => {
            setUsername(id); // ✅ 로그인 시 아이디 저장
            setIsLoggedIn(true);
          }}
        />
      ) : (
        <div style={{ fontFamily: "sans-serif" }}>
          {/* ✅ 네비게이션바에서 로그인한 아이디 표시 */}
          <Navbar username={username} />

          <div style={{ padding: "20px" }}>
            <Routes>
              {/* 홈 */}
              <Route path="/" element={<Home username={username} />} />

              {/* 검색 */}
              <Route path="/search" element={<Search />} />

              {/* ✅ 영화 상세 (로그인한 유저 아이디 전달) */}
              <Route path="/movie/:id" element={<MovieDetail userId={username} />} />

              {/* 내 정보 페이지 */}
              <Route path="/mypage" element={<MyPage username={username} />} />

              {/* 잘못된 경로는 홈으로 리다이렉트 */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
