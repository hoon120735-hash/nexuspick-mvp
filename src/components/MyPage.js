import React from "react";

function MyPage({ userId, onChargePoints }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#4f46e5" }}>👤 내 정보</h2>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <p>
          <strong>아이디:</strong> {userId || "로그인 정보 없음"}
        </p>
        <p>
          <strong>소장 영화:</strong> 3편
        </p>
        <p>
          <strong>시청 기록:</strong> 최근 5개
        </p>
        <p>
          <strong>보유 포인트:</strong> 12,000P
        </p>

        <button
          onClick={onChargePoints}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          💳 포인트 충전하기
        </button>
      </div>
    </div>
  );
}

export default MyPage;
