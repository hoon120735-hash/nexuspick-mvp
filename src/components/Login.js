import React, { useState } from "react";

function Login({ onLogin }) {
  const [step, setStep] = useState(1); // 1️⃣ 관심사 단계 / 2️⃣ 로그인 단계
  const [language, setLanguage] = useState("한국어");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loginMethod, setLoginMethod] = useState(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const interests = ["K-POP", "아름다움", "음식", "전통", "쇼핑"];

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleStart = () => {
    if (!loginMethod) {
      alert("로그인 방식을 선택해주세요 😊");
      return;
    }
    if (selectedInterests.length === 0) {
      alert("하나 이상의 관심사를 선택해주세요 💡");
      return;
    }
    setStep(2); // ✅ 다음 단계(아이디/비번 입력)로 이동
  };

  const handleLogin = () => {
    if (!userId || !password) {
      alert("아이디와 비밀번호를 입력해주세요 🔐");
      return;
    }

    console.log("✅ 로그인 완료:", {
      loginMethod,
      language,
      selectedInterests,
      userId,
    });

    // ✅ 기존 App.js onLogin() 실행 (홈화면으로 이동)
    onLogin();
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ color: "#4f46e5", fontWeight: "bold", fontSize: "28px" }}>
        🎬 넥서스픽
      </h1>

      {/* 🔹 STEP 1: 로그인 방식 + 관심사 선택 */}
      {step === 1 && (
        <>
          <p style={{ marginTop: "6px", color: "#555" }}>
            영화 취향을 연결해보세요.
          </p>

          <div style={{ marginTop: "20px" }}>
            <label style={{ fontWeight: "bold" }}>언어 선택</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                marginTop: "8px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option>한국어</option>
              <option>영어</option>
              <option>일본어</option>
              <option>중국어</option>
            </select>
          </div>

          <div style={{ marginTop: "24px" }}>
            <h3 style={{ marginBottom: "10px" }}>소셜 로그인</h3>
            {["Google", "Apple", "일반"].map((method) => (
              <button
                key={method}
                onClick={() => setLoginMethod(method.toLowerCase())}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border:
                    loginMethod === method.toLowerCase()
                      ? "2px solid #4f46e5"
                      : "1px solid #ccc",
                  background: "white",
                  cursor: "pointer",
                  marginBottom: "8px",
                }}
              >
                {method === "Google" && "🔍 Google로 시작하기"}
                {method === "Apple" && "🍎 Apple로 시작하기"}
                {method === "일반" && "💻 일반 로그인"}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "24px" }}>
            <h3 style={{ marginBottom: "10px" }}>관심사를 선택해주세요</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                justifyContent: "center",
              }}
            >
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "16px",
                    border: selectedInterests.includes(interest)
                      ? "2px solid #4f46e5"
                      : "1px solid #ccc",
                    background: selectedInterests.includes(interest)
                      ? "#eef2ff"
                      : "white",
                    cursor: "pointer",
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            style={{
              width: "100%",
              marginTop: "28px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            시작하기
          </button>
        </>
      )}

      {/* 🔹 STEP 2: 아이디/비밀번호 입력 */}
      {step === 2 && (
        <>
          <h2 style={{ marginTop: "20px" }}>🔐 로그인</h2>
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <label>아이디</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginTop: "15px", textAlign: "left" }}>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              marginTop: "24px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            로그인하기
          </button>

          <button
            onClick={() => setStep(1)}
            style={{
              width: "100%",
              marginTop: "10px",
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ← 이전 단계로 돌아가기
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
