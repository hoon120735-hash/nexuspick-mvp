import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
      // Firebase 로그인
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // UID
      const uid = user.uid;

      // Firestore 사용자 문서 존재 여부 확인
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // Firestore 유저 문서가 없으면 자동 생성
        await setDoc(userRef, {
          displayName: email,
          points: 10000,
          ownedMovies: []
        });
      }

      // 부모(App.js)에게 UID 전달
      onLogin(uid);

    } catch (error) {
      setErrorMsg("로그인 실패: " + error.message);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>로그인</h2>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "260px" }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "260px" }}
        />
      </div>

      <button
        onClick={handleLogin}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        로그인
      </button>

      {errorMsg && <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>}
    </div>
  );
}

export default Login;
