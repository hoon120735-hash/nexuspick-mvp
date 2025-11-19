import React, { useState } from "react";

function Login({ onLogin }) {
  const [userId, setUserId] = useState("");

  const handleLogin = () => {
    if (!userId.trim()) return alert("아이디를 입력하세요!");

    localStorage.setItem("username", userId);
    localStorage.setItem("points", "5000");
    localStorage.setItem("ownedMovies", JSON.stringify([]));

    onLogin(userId);
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2 style={{ marginBottom: 20 }}>NexusPick 로그인</h2>

      <input
        placeholder="이메일 또는 이름 입력"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: "10px 12px", width: 250 }}
      />

      <br /><br />

      <button
        onClick={handleLogin}
        style={{ background: "#4f46e5", color: "white", padding: "10px 16px", border: "none", borderRadius: 6 }}
      >
        로그인
      </button>
    </div>
  );
}

export default Login;
