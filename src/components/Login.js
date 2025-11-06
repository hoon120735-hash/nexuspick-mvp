import React, { useState } from "react";

function Login({ onLogin }) {
  const [language, setLanguage] = useState("한국어");
  const [interests, setInterests] = useState([]);

  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      {/* 로고 & 제목 */}
      <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#4f46e5" }}>
        🎬 NexusPick
      </h1>
      <p style={{ marginTop: "4px", color: "#6b7280" }}>
        Discover and Save Your Favorite Movies
      </p>

      {/* 로그인 카드 */}
      <div
        style={{
          backgroundColor: "white",
          marginTop: "30px",
          borderRadius: "16px",
          padding: "30px",
          width: "350px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {/* 언어 선택 */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", display: "block", marginBottom: "8px" }}>
            언어 선택 / Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
          >
            <option>한국어</option>
            <option>English</option>
            <option>日本語</option>
            <option>中文</option>
          </select>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            style={{
              backgroundColor: "white",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            🔍 Google로 시작하기
          </button>

          <button
            style={{
              backgroundColor: "white",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            🍎 Apple로 시작하기
          </button>

          <button
            style={{
              border: "2px solid #4f46e5",
              borderRadius: "8px",
              padding: "10px",
              color: "#4f46e5",
              fontWeight: "600",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "15px",
            }}
            onClick={onLogin}
          >
            🎫 일반 로그인
          </button>
        </div>

        {/* 관심사 선택 */}
        <div style={{ marginTop: "25px" }}>
          <p style={{ fontWeight: "600", marginBottom: "10px" }}>
            관심사를 선택해주세요
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {["액션", "로맨스", "코미디", "SF", "공포", "드라마"].map((item) => (
              <button
                key={item}
                onClick={() => toggleInterest(item)}
                style={{
                  borderRadius: "20px",
                  border: interests.includes(item)
                    ? "2px solid #4f46e5"
                    : "1px solid #d1d5db",
                  backgroundColor: interests.includes(item)
                    ? "#e0e7ff"
                    : "white",
                  padding: "6px 14px",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 시작하기 버튼 */}
        <button
          onClick={onLogin}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(to right, #6366f1, #818cf8)",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          시작하기
        </button>
      </div>

      {/* 하단 네비게이션 바 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "white",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0",
        }}
      >
        <span>🏠 Home</span>
        <span>🔍 Explore</span>
        <span>🎬 Movies</span>
        <span>💳 Pass</span>
        <span>⚙️ More</span>
      </div>
    </div>
  );
}

export default Login;

