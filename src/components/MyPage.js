// src/components/MyPage.js
import React, { useState } from "react";

function MyPage({ username, points, ownedMovies, onChargePoints }) {
  const [showModal, setShowModal] = useState(false);

  const amounts = [1000, 5000, 10000];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>내 정보</h2>
      <p>아이디: {username}</p>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        보유 포인트: {points.toLocaleString()}P
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

      <h3 style={{ marginTop: "30px" }}>🎬 소장한 영화</h3>

      {/* 소장 영화 목록 - 3열 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginTop: "10px",
        }}
      >
        {ownedMovies.length === 0 ? (
          <p>소장한 영화가 없습니다.</p>
        ) : (
          ownedMovies.map((m) => (
            <div
              key={m.id}
              style={{
                background: "white",
                padding: "12px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <strong>{m.title}</strong>
              <p>{m.price.toLocaleString()}P</p>
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

            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  onChargePoints(amt);
                  setShowModal(false);
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "6px",
                  backgroundColor: "#e0e7ff",
                  border: "1px solid #4f46e5",
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
