// src/components/Login.js
import React, { useState } from "react";

function Login({ onLogin }) {
  const [step, setStep] = useState(1); // 1 = 로그인 입력, 2 = 관심사 선택
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState([]);

  const interestList = [
    "액션",
    "코미디",
    "SF",
    "로맨스",
    "스릴러",
    "드라마",
    "애니메이션",
  ];

  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleStart = () => {
    if (!email.trim() || !password.trim()) {
      alert("이메일과 비밀번호를 입력해주세요!");
      return;
    }
    setStep(2); // 관심사 선택 화면으로 이동
  };

  const handleFinish = () => {
    onLogin(email); // App.js로 로그인 이메일 전달
  };

  return (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "360px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2
          style={{ color: "#4f46e5", marginBottom: "20px", fontWeight: "bold" }}
        >
          NexusPick 로그인
        </h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />

            <input
              type="password"
              placeholder="비밀번호 입력(형식만)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />

            <button
              onClick={handleStart}
              style={{
                width: "100%",
                backgroundColor: "#4f46e5",
                color: "white",
                padding: "12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              계속하기
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h3 style={{ marginBottom: "10px" }}>관심사 선택</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "20px",
                justifyContent: "center",
              }}
            >
              {interestList.map((item) => (
                <div
                  key={item}
                  onClick={() => toggleInterest(item)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "20px",
                    border: interests.includes(item)
                      ? "2px solid #4f46e5"
                      : "1px solid #ccc",
                    backgroundColor: interests.includes(item)
                      ? "#e0e7ff"
                      : "white",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={handleFinish}
              style={{
                width: "100%",
                backgroundColor: "#4f46e5",
                color: "white",
                padding: "12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              시작하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
