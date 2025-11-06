import React, { useState } from "react";

function Login({ onLogin }) {
  const [language, setLanguage] = useState("한국어");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loginMethod, setLoginMethod] = useState(null);

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

    console.log("✅ 로그인 정보:", {
      language,
      loginMethod,
      selectedInterests,
    });

    // 🔹 기존 로그인 방식으로 연결
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
      <p style={{ marginTop: "6px", color: "#555" }}>
        영화 취향을 연결해보세요.
      </p>

      <div style={{ marginTop: "20px" }}>
        <label style={{ fontWeight: "bold" }}>언어 선택 / 언어</label>
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
        <button
          onClick={() => setLoginMethod("google")}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: loginMethod === "google" ? "2px solid #4f46e5" : "1px solid #ccc",
            background: "white",
            cursor: "pointer",
            marginBottom: "8px",
          }}
        >
          🔍 Google로 시작하기
        </button>
        <button
          onClick={() => setLoginMethod("apple")}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: loginMethod === "apple" ? "2px solid #4f46e5" : "1px solid #ccc",
            background: "white",
            cursor: "pointer",
            marginBottom: "8px",
          }}
        >
          🍎 Apple로 시작하기
        </button>
        <button
          onClick={() => setLoginMethod("normal")}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: loginMethod === "normal" ? "2px solid #4f46e5" : "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
        >
          💻 일반 로그인
        </button>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3 style={{ marginBottom: "10px" }}>관심사를 선택해주세요</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
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

      <footer style={{ marginTop: "40px", color: "#777", fontSize: "12px" }}>
        © 2025 NexusPick. 모든 권리 보유.
      </footer>
    </div>
  );
}

export default Login;
