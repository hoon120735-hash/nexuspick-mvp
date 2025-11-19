// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import MyPage from "./components/MyPage";
import Search from "./components/Search";
import Login from "./components/Login";

// ✅ 상단 네비게이션바 컴포넌트
function Navbar({ username }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  // Enter로 검색 실행 → /search?q=...
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
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

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* 오른쪽 상단에 로그인한 사용자 이메일 표시 */}
        {username && (
          <span style={{ fontWeight: "bold" }}>{username}님 👋</span>
        )}

        {/* 검색창 */}
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

        {/* 내 정보 버튼 → 마이페이지로 이동 */}
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

// ✅ 메인 App 컴포넌트
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [username, setUsername] = useState(""); // 형식상 로그인 이메일
  const [points, setPoints] = useState(10000); // 보유 포인트 (초기값 10,000P)
  const [ownedMovies, setOwnedMovies] = useState([]); // 소장한 영화 목록 (화면에서만 관리)

  // 🔐 형식상의 로그인 처리 (Firebase Auth 사용 X)
  const handleLogin = (email) => {
    setUsername(email);
    setIsLoggedIn(true);

    // 로그인할 때마다 새 세션처럼 초기화
    setPoints(10000);
    setOwnedMovies([]);
  };

  // 💰 포인트 충전 (MyPage에서 호출)
  const handleChargePoints = (amount) => {
    setPoints((prev) => prev + amount);
  };

  // 🎬 영화 소장하기 (MovieDetail에서 호출)
  const handlePurchaseMovie = (movie) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (!movie || !movie.id || !movie.price) {
      alert("영화 정보가 올바르지 않습니다.");
      return;
    }

    // 포인트 부족 체크
    if (points < movie.price) {
      alert("포인트가 부족합니다. 충전 후 이용해주세요.");
      return;
    }

    // 포인트 차감
    setPoints((prev) => prev - movie.price);

    // 이미 소장한 영화인지 체크
    setOwnedMovies((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        alert(`이미 "${movie.title}"를 소장하고 있습니다.`);
        return prev;
      }
      alert(`"${movie.title}"를 소장했습니다!`);
      return [...prev, movie];
    });
  };

  return (
    <Router>
      {!isLoggedIn ? (
        // 🔐 아직 로그인 안했으면 로그인 화면만 보여줌
        <Login onLogin={handleLogin} />
      ) : (
        // ✅ 로그인 후 메인 레이아웃
        <div
          style={{
            fontFamily: "sans-serif",
            backgroundColor: "#f3f4f6",
            minHeight: "100vh",
          }}
        >
          <Navbar username={username} />

          <div style={{ padding: "20px" }}>
            <Routes>
              {/* 홈 화면 */}
              <Route
                path="/"
                element={<Home username={username} />}
              />

              {/* 영화 상세 화면 */}
              <Route
                path="/movie/:id"
                element={
                  <MovieDetail
                    onPurchase={handlePurchaseMovie}
                    ownedMovies={ownedMovies}
                    points={points}
                  />
                }
              />

              {/* 마이페이지 */}
              <Route
                path="/mypage"
                element={
                  <MyPage
                    username={username}
                    points={points}
                    ownedMovies={ownedMovies}
                    onChargePoints={handleChargePoints}
                  />
                }
              />

              {/* 검색 페이지 */}
              <Route path="/search" element={<Search />} />

              {/* 잘못된 경로 → 홈으로 */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
