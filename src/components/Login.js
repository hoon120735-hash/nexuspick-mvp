// src/components/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Firebase 초기화된 auth

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const uid = userCredential.user.uid; // 🔥 UID 확보

      // 🔥 App.js로 UID 전달
      onLogin(uid);

    } catch (error) {
      setErrorMsg("로그인 실패: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>로그인</h2>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "250px" }}>
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "8px" }}
        />

        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "8px" }}
        />

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        <button
          type="submit"
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            padding: "10px",
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
