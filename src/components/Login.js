import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = async () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!pw.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, pw);
      onLogin(email);        // App.js 로 전달
    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f7",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "16px",
          width: "400px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#4f46e5" }}>
          🎬 NexusPick 로그인
        </h2>

        {/* 이메일 */}
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* 비밀번호 (명목형 입력) */}
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4f46e5",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
