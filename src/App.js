import React, { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import MyPage from "./components/MyPage";
import MovieDetail from "./components/MovieDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

function Navbar({ username }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "12px 20px",
        backgroundColor: "#4f46e5",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        NexusPick 🎬
      </h2>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {username && <strong>{username}</strong>}

        <button
          onClick={() => navigate("/mypage")}
          style={{
            background: "white",
            color: "#4f46e5",
            border: "none",
            padding: "6px 12px",
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <Login
          onLogin={(email) => {
            setUsername(email);
            setIsLoggedIn(true);
          }}
        />
      ) : (
        <>
          <Navbar username={username} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/movie/:id"
              element={<MovieDetail username={username} />}
            />
            <Route
              path="/mypage"
              element={<MyPage username={username} onLogout={handleLogout} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
