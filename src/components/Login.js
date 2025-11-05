// src/components/Login.js
import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 검증 로직은 간단히 통과 처리
    if (email && password) {
      onLogin(); // 로그인 성공 시 App 상태 변경
    } else {
      alert("이메일과 비밀번호를 입력하세요!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h2 style={{ color: "#4f46e5" }}>🎬 NexusPick MVP 로그인</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "250px", marginBottom: "10px" }}
        />
        <br />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "250px", marginBottom: "10px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;
