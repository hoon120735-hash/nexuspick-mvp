import React, { useState } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";
import Login from "./components/Login";
import MyPage from "./components/MyPage";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// -------------------
// 네비게이션바
// -------------------
function Navbar({ userId }) {
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
        borderBottom: "1px solid #e5e7eb"
      }}
    >
      <h1
        onClick={() => navigate("/")}
        style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "bold" }}
      >
        🎬 넥서스픽
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {userId && <span style={{ fontWeight: "bold" }}>UID: {userId}</span>}

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
            width: "220px"
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
            cursor: "pointer"
          }}
        >
          내 정보
        </button>
      </div>
    </div>
  );
}

// -------------------
// 메인 App 컴포넌트
// -------------------
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(""); // UID 저장

  return (
    <Router>
      {!isLoggedIn ? (
        <Login
          onLogin={(uid) => {
            setUserId(uid);
            setIsLoggedIn(true);
          }}
        />
      ) : (
        <div style={{ fontFamily: "sans-serif" }}>
          <Navbar userId={userId} />

          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home userId={userId} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:id" element={<MovieDetail userId={userId} />} />
              <Route path="/mypage" element={<MyPage userId={userId} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
