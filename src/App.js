import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import MovieDetail from "./components/MovieDetail";
import MyPage from "./components/MyPage";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

function Navbar({ username, onLogout }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #ddd" }}>
      <h2 style={{ cursor: "pointer", color: "#4f46e5" }} onClick={() => navigate("/")}>
        NexusPick
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {username && <b>{username}님 👋</b>}

        <button onClick={() => navigate("/mypage")}>내 정보</button>

        <button
          onClick={() => {
            localStorage.clear();
            onLogout();
            navigate("/");
          }}
          style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 12px", borderRadius: 6 }}
        >
          앱 종료(로그아웃)
        </button>
      </div>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) setUsername(saved);
  }, []);

  if (!username) {
    return <Login onLogin={(id) => setUsername(id)} />;
  }

  return (
    <Router>
      <Navbar username={username} onLogout={() => setUsername("")} />

      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
