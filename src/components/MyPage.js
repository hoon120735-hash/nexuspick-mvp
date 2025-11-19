// src/components/MyPage.js
import React, { useState, useEffect } from "react";

function MyPage() {
  const [points, setPoints] = useState(
    Number(localStorage.getItem("nexusPoints") || 10000)
  );

  const [ownedMovies, setOwnedMovies] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const chargeAmounts = [1000, 5000, 10000];

  // 소장 목록 로딩
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ownedMovies") || "[]");
    setOwnedMovies(saved);
  }, []);

  // 포인트 충전
  const chargePoints = (amount) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    localStorage.setItem("nexusPoints", newPoints);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>내 정보</h2>

      <p style={{ marginTop: "15px", fontSize: "18px" }}>
        보유 포인트: <strong>{points.toLocaleString()}P</strong>
      </p>

      <button
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: "#4f46e5",
          color: "white",
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        💳 포인트 충전하기
      </button>

      <h3 style={{ marginTop: "30px" }}>🎬 소장한 콘텐츠</h3>

      {/* 3열 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginTop: "15px",
        }}
      >
        {ownedMovies.length === 0 ? (
          <p>소장한 영화가 없습니다.</p>
        ) : (
          ownedMovies.map((title, i) => (
            <div
              key={i}
              style={{
                background: "white",
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              {title}
            </div>
          ))
        )}
      </div>

      {/* 충전 팝업 */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "300px",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>충전 금액 선택</h3>

            {chargeAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  chargePoints(amt);
                  setShowModal(false);
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "6px",
                  border: "1px solid #4f46e5",
                  background: "#eef2ff",
                  cursor: "pointer",
                }}
              >
                {amt.toLocaleString()}P 충전
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPage;
