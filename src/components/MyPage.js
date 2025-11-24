// src/components/MyPage.js
import React, { useState } from "react";

function MyPage({ username, points, ownedMovies, onChargePoints }) {
  const [showModal, setShowModal] = useState(false);
  const chargeAmounts = [1000, 5000, 10000];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>내 정보</h2>

      {/* 아이디 표시 */}
      {username && (
        <p style={{ marginTop: "8px" }}>
          <strong>아이디:</strong> {username}
        </p>
      )}

      {/* 포인트 표시 */}
      <p style={{ marginTop: "15px", fontSize: "18px" }}>
        보유 포인트: <strong>{points.toLocaleString()}P</strong>
      </p>

      {/* 포인트 충전 버튼 */}
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

      {/* 소장한 영화 리스트 */}
      <h3 style={{ marginTop: "30px" }}>🎬 소장한 콘텐츠</h3>

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
          ownedMovies.map((movie, i) => (
            <div
              key={movie.id || i}
              style={{
                background: "white",
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <strong>{movie.title}</strong>
              {movie.price && (
                <p style={{ marginTop: "6px", color: "#4b5563" }}>
                  {movie.price.toLocaleString()}P
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* 충전 모달 */}
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
            zIndex: 999,
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
                  onChargePoints(amt); // App.js 쪽 state 업데이트
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
